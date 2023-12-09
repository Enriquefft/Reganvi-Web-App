from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from phonenumber_field.modelfields import PhoneNumberField
from django.core.validators import RegexValidator


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
      GENDER_CHOICES = (
            (1, 'male'),
            (2, 'female'),
            (3, 'other')
      )
      email = models.EmailField(max_length=254, unique=True)
      password = models.CharField(max_length=128, null=True)
      first_name = models.CharField(max_length=255, null=True, blank=True)
      last_name = models.CharField(max_length=255, null=True, blank=True)
      created_at = models.DateTimeField(auto_now_add=True)
      updated_at = models.DateTimeField(auto_now=True)
      gender = models.SmallIntegerField(choices=GENDER_CHOICES)
      is_staff = models.BooleanField(default=False)
      is_superuser = models.BooleanField(default=False)
      is_active = models.BooleanField(default=True)
      phone_number = PhoneNumberField(blank=True, unique=True)
      profile_image = models.ImageField(null=True, blank=True, default='/profile.jpg')
      
      USERNAME_FIELD = 'email'
      REQUIRED_FIELDS = ['gender', 'phone_number']

      objects = UserManager()

      def has_module_perms(self, app_label):
            if self.is_superuser:
                  return True
            return True

      def has_perm(self, perm, obj=None):
            if self.is_superuser:
                  return True
            return True
      
      class Meta:
            verbose_name = 'CustomUser'
            verbose_name_plural = 'CustomUsers'

      def get_full_name(self):
            return self.email

      def get_short_name(self):
            return self.first_name
      

class Company(models.Model):
      RUC = models.CharField(max_length=11, unique=True, validators=[RegexValidator(r'^\d{11}$', 'RUC must be 11 digits')])
      company_name = models.CharField(max_length=255)
      
      def __str__(self):
            return f"{self.RUC} - {self.company_name}"

class CompanyInfo(models.Model):
      RUC = models.CharField(max_length=11, validators=[RegexValidator(r'^\d{11}$', 'RUC must be 11 digits')])
      company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='company_info')
      user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='company_info', unique=True)
      contact_email = models.EmailField()
      company_name = models.CharField(max_length=255)
      job_title = models.CharField(max_length=255)
      identification = models.CharField(max_length=255)

      def save(self, *args, **kwargs):
            company = Company.objects.filter(RUC=self.RUC).first()

            if not company:
                  company = Company.objects.create(RUC=self.RUC, company_name=self.company_name)

            self.company = company
            super().save(*args, **kwargs)

      def __str__(self):
            return f"{self.identification} - {self.company_name} ({self.RUC})"
      

class ProductCategory(models.Model):
      name = models.CharField(max_length=255, unique=True)

      def __str__(self):
            return self.name

class ProductIndustry(models.Model):
      name = models.CharField(max_length=255, unique=True)

      def __str__(self):
            return self.name

class Product(models.Model):
      name = models.CharField(max_length=255, unique=True)
      category = models.ForeignKey(ProductCategory, on_delete=models.CASCADE)

      def __str__(self):
            return f"{self.name} - {self.category}"


class ProductInstance(models.Model):
      UNIT_CHOICES = [
            ('KG', 'Kilogram'),
            ('TON', 'Ton'),
            ('G', 'Gram'),
            ('LB', 'Pound'),
            ('L', 'Liter'),
            ('ML', 'Milliliter'),
            ('M3', 'Cubic Meter'),
            ('CM3', 'Cubic Centimeter'),
            ('EA', 'Each'),
            ('DOZ', 'Dozen'),
            ('M', 'Meter'),
            ('CM', 'Centimeter'),
            ('INCH', 'Inch'),
      ]
      name = models.CharField(max_length=255)
      bulk_price = models.DecimalField(max_digits=10, decimal_places=2)
      pressed_price = models.DecimalField(max_digits=10, decimal_places=2)
      ground_price = models.DecimalField(max_digits=10, decimal_places=2)
      raw_material_price = models.DecimalField(max_digits=10, decimal_places=2)
      unit_of_measure = models.CharField(max_length=50, choices=UNIT_CHOICES)

      product = models.ForeignKey(Product, on_delete=models.CASCADE)
      company = models.ForeignKey(Company, on_delete=models.CASCADE)
      industry = models.ForeignKey(ProductIndustry, on_delete=models.CASCADE)

      class Meta:
            unique_together = ['product', 'company']

      def __str__(self):
            return f"{self.product.name} - {self.company.company_name} ({self.company.RUC}) - {self.industry.name}"

