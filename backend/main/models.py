from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from phonenumber_field.modelfields import PhoneNumberField

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