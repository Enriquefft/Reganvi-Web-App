from rest_framework import serializers
from ..models import ProductCategory, Product, ProductInstance, Company, ProductIndustry
from ..serializers.company_serializers import CompanySerializer

class ProductCategorySerializer(serializers.ModelSerializer):
      class Meta:
            model = ProductCategory
            fields = ['id', 'name']

class ProductSerializer(serializers.ModelSerializer):
      category = ProductCategorySerializer()

      class Meta:
            model = Product
            fields = ['id', 'name', 'category']

class ProductIndustrySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductIndustry
        fields = ['id', 'name']


class ProductInstanceSerializer(serializers.ModelSerializer):
      product_name = serializers.CharField(write_only=True)
      company_ruc = serializers.CharField(write_only=True)
      industry_name = serializers.CharField(write_only=True)

      product = ProductSerializer(read_only=True)
      company = CompanySerializer(read_only=True)
      industry = ProductIndustrySerializer(read_only=True)

      class Meta:
            model = ProductInstance
            fields = ['id', 'name', 'bulk_price', 'pressed_price', 'ground_price', 'raw_material_price',
                        'unit_of_measure', 'product_name', 'company_ruc', 'industry_name', 'product', 'company', 'industry']

      def create(self, validated_data):
            product_name = validated_data.pop('product_name')
            company_ruc = validated_data.pop('company_ruc')
            industry_name = validated_data.pop('industry_name')

            product, _ = Product.objects.get_or_create(name=product_name)
            company, _ = Company.objects.get_or_create(RUC=company_ruc)
            industry, _ = ProductIndustry.objects.get_or_create(name=industry_name)

            validated_data['product'] = product
            validated_data['company'] = company
            validated_data['industry'] = industry

            return ProductInstance.objects.create(**validated_data)
      


class ProductInstanceCotizationSerializer(serializers.Serializer):
      product_instance = serializers.SerializerMethodField()
      cotization_price = serializers.DecimalField(max_digits=10, decimal_places=2)

      def get_product_instance(self, obj):
            return ProductInstanceSerializer(obj['product_instance']).data





