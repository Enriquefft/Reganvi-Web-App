from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from phonenumber_field.modelfields import PhoneNumberField
from django.core.validators import RegexValidator

from .utils import GENDER_CHOICES, RATINGS, COUNTRY_INDEX, UNIT_CHOICES

class UserManager(BaseUserManager):
      def create_user(self, email, password, **extra_fields):
            if not email:
                  raise ValueError("The email is not given.")
            email = self.normalize_email(email)
            user = self.model(email=email, **extra_fields)
            user.is_active = True
            user.set_password(password)
            user.save()
            return user

      def create_superuser(self, email, password, **extra_fields):
            extra_fields.setdefault('is_staff', True)
            extra_fields.setdefault('is_superuser', True)
            extra_fields.setdefault('is_active', True)

            if not extra_fields.get('is_staff'):
                  raise ValueError("Superuser must have is_staff = True")

            if not extra_fields.get('is_superuser'):
                  raise ValueError("Superuser must have is_superuser = True")
            return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser):
     
      email = models.EmailField(max_length=254, unique=True)
      password = models.CharField(max_length=128, null=True)
      gender = models.SmallIntegerField(choices=GENDER_CHOICES)
      phone_number = PhoneNumberField(blank=True, unique=True)
      #language
      #age
      first_name = models.CharField(max_length=255, null=True, blank=True)
      last_name = models.CharField(max_length=255, null=True, blank=True)
      profile_image = models.ImageField(null=True, blank=True, default='/profile.jpg')

      created_at = models.DateTimeField(auto_now_add=True)
      updated_at = models.DateTimeField(auto_now=True)
      
      is_premium = models.BooleanField(default=False)
      is_staff = models.BooleanField(default=False)
      is_superuser = models.BooleanField(default=False)
      is_active = models.BooleanField(default=True)
      
      USERNAME_FIELD = 'email'
      REQUIRED_FIELDS = ['gender', 'phone_number']

      objects = UserManager()
      
      def has_module_perms(self, app_label):
            if self.is_superuser:
                  return True
            return False

      def has_perm(self, perm, obj=None):
            if self.is_superuser:
                  return True
            return False
      
      class Meta:
            verbose_name = 'CustomUser'
            verbose_name_plural = 'CustomUsers'

      def get_full_name(self):
            return self.email

      def get_short_name(self):
            return self.first_name


class StaffProfile(models.Model):
      user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
      contact_email = models.EmailField()
      contact_phone = PhoneNumberField(blank=True, unique=True)

      created_at = models.DateTimeField(auto_now_add=True)
      updated_at = models.DateTimeField(auto_now=True)

      def __str__(self):
            return f"{self.user} - {self.contact_email}"


class Company(models.Model):
      RUC = models.CharField(max_length=11, unique=True, validators=[RegexValidator(r'^\d{11}$', 'RUC must be 11 digits')])
      company_name = models.CharField(max_length=255)

      mision = models.TextField()
      vision = models.TextField()
      values = models.TextField()
      profile_image = models.ImageField(null=True, blank=True, default='/profile.jpg')

      factura = models.BooleanField(default=True)

      # LOCATION
      latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
      longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
      district = models.CharField(max_length=255, null=True, blank=True)
      city = models.CharField(max_length=255, null=True, blank=True)
      country = models.CharField(max_length=255, null=True, blank=True)

      # STATISTICS
      rating = models.SmallIntegerField(null=True, choices=RATINGS)
      sales_count = models.IntegerField(blank=True, null=True)
      
      created_at = models.DateTimeField(auto_now_add=True)
      updated_at = models.DateTimeField(auto_now=True)
      
      def __str__(self):
            return f"{self.RUC} - {self.company_name}"


class CompanyInfo(models.Model): # Belongs to a member of a company
      company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='company_info')
      user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='company_info', unique=True)

      contact_email = models.EmailField()
      contact_phone = PhoneNumberField(blank=True, unique=True)
      job_title = models.CharField(max_length=255)
      identification = models.CharField(max_length=255)

      created_at = models.DateTimeField(auto_now_add=True)
      updated_at = models.DateTimeField(auto_now=True)

      def __str__(self):
            return f"{self.identification} - {self.company}"


class ProductCategory(models.Model):
      name = models.CharField(max_length=255, unique=True)
      image = models.ImageField(null=True, blank=True, default='/profile.jpg')
      description = models.TextField(null=True, blank=True)
      related_categories = models.ManyToManyField('self', blank=True) #symmetrical=True

      created_at = models.DateTimeField(auto_now_add=True)
      updated_at = models.DateTimeField(auto_now=True)

      def __str__(self):
            return self.name

class Product(models.Model):
      category = models.ForeignKey(ProductCategory, on_delete=models.CASCADE)
      name = models.CharField(max_length=255, unique=True)
      image = models.ImageField(null=True, blank=True, default='/profile.jpg')
      description = models.TextField(null=True, blank=True)
      related_products = models.ManyToManyField('self', blank=True) #symmetrical=True

      created_at = models.DateTimeField(auto_now_add=True)
      updated_at = models.DateTimeField(auto_now=True)

      def __str__(self):
            return f"{self.name} - {self.category}"

class ProductInstance(models.Model):
      product = models.ForeignKey(Product, on_delete=models.CASCADE)
      company = models.ForeignKey(Company, on_delete=models.CASCADE)

      name = models.CharField(max_length=255)
      image = models.ImageField(null=True, blank=True, default='/profile.jpg')
      description = models.TextField(null=True, blank=True)

      # FILTERS
      bulk_price = models.DecimalField(max_digits=10, decimal_places=2)
      pressed_price = models.DecimalField(max_digits=10, decimal_places=2)
      ground_price = models.DecimalField(max_digits=10, decimal_places=2)
      raw_material_price = models.DecimalField(max_digits=10, decimal_places=2)
      unit_of_measure = models.CharField(max_length=50, choices=UNIT_CHOICES)

      available_quantity = models.IntegerField()

      created_at = models.DateTimeField(auto_now_add=True)
      updated_at = models.DateTimeField(auto_now=True)

      class Meta:
            unique_together = ['product', 'company']

      def __str__(self):
            return f"{self.product.name} - {self.company.company_name} ({self.company.RUC})"
      

class CotizationLog(models.Model):
      PROUDCT_TYPES = (
            (1, 'bulk'),
            (2, 'pressed'),
            (3, 'ground'),
            (4, 'raw'),
            (5, 'all')
      )
      user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
      product = models.ForeignKey(Product, on_delete=models.CASCADE)
      product_type = models.CharField(max_length=50, choices=PROUDCT_TYPES)
      amount = models.IntegerField()
      unit_of_measure = models.CharField(max_length=50, choices=UNIT_CHOICES)

      created_at = models.DateTimeField(auto_now_add=True)
      updated_at = models.DateTimeField(auto_now=True)

      def __str__(self):
            return f"{self.user} - {self.product}"
      

class Review(models.Model):
      user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
      company = models.ForeignKey(Company, on_delete=models.CASCADE)
      rating = models.IntegerField(null=True, blank=True)
      comment = models.TextField(null=True, blank=True)

      is_public = models.BooleanField(default=False)

      created_at = models.DateTimeField(auto_now_add=True)
      updated_at = models.DateTimeField(auto_now=True)

      def __str__(self):
            return f"{self.user} - {self.company}"
      

