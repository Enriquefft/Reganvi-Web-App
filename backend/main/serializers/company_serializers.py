from rest_framework import serializers
from ..models import CompanyInfo, Company
from rest_framework.exceptions import ValidationError

class CompanySerializer(serializers.ModelSerializer):
      class Meta:
            model = Company
            fields = ['id', 'RUC', 'company_name']

class CompanyInfoSerializer(serializers.ModelSerializer):
      company = CompanySerializer(required=False)

      class Meta:
            model = CompanyInfo
            fields = ['id', 'RUC', 'company', 'user', 'contact_email', 'company_name', 'job_title', 'identification']
            read_only_fields = ['user', 'company']

      def create(self, validated_data):
            company_data = validated_data.pop('company', None)

            user = validated_data.get('user')
            if CompanyInfo.objects.filter(user=user).exists():
                  raise ValidationError("CompanyInfo for this user already exists.")


            if company_data:
                  company, created = Company.objects.get_or_create(**company_data)
            else:
                  company = None

            company_info = CompanyInfo.objects.create(company=company, **validated_data)
            return company_info