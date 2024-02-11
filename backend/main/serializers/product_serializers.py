from rest_framework import serializers
from ..models import ProductCategory, Product, ProductInstance, Company #ProductIndustry
from ..serializers.company_serializers import CompanySerializer

class SmallProductCategorySerializer(serializers.ModelSerializer):
      class Meta:
            model = ProductCategory
            fields = ['id', 'name']

class ProductCategorySerializer(serializers.ModelSerializer):
      related_categories = serializers.SerializerMethodField()
      class Meta:
            model = ProductCategory
            fields = ['id', 'name', 'image', 'related_categories']
      def get_related_categories(self, obj):
            related_categories = obj.related_categories.all()
            return SmallProductCategorySerializer(related_categories, many=True).data


class SmallProductSerializer(serializers.ModelSerializer):
      class Meta:
            model = Product
            fields = ['id', 'name']

class ProductSerializer(serializers.ModelSerializer):
      category = ProductCategorySerializer()
      related_products = serializers.SerializerMethodField()

      class Meta:
            model = Product
            fields = ['id', 'name', 'category', 'description', 'image', 'related_products']
      
      def get_related_products(self, obj):
            related_products = obj.related_products.all()
            return SmallProductSerializer(related_products, many=True).data



class ProductInstanceSerializer(serializers.ModelSerializer):
      product_name = serializers.CharField(write_only=True)
      company_ruc = serializers.CharField(write_only=True)

      product = ProductSerializer(read_only=True)
      company = CompanySerializer(read_only=True)

      class Meta:
            model = ProductInstance
            fields = ['id', 'name', 'image', 'bulk_price', 'pressed_price', 'ground_price', 'raw_material_price',
                        'unit_of_measure', 'product_name', 'company_ruc', 'product', 'company', 'available_quantity']

      def create(self, validated_data):
            product_name = validated_data.pop('product_name')
            company_ruc = validated_data.pop('company_ruc')

            product, _ = Product.objects.get_or_create(name=product_name)
            company, _ = Company.objects.get_or_create(RUC=company_ruc)

            validated_data['product'] = product
            validated_data['company'] = company

            return ProductInstance.objects.create(**validated_data)
      


class ProductInstanceCotizationSerializer(serializers.Serializer):
      product_instance = serializers.SerializerMethodField()
      cotization_price = serializers.DecimalField(max_digits=10, decimal_places=2)

      def get_product_instance(self, obj):
            return ProductInstanceSerializer(obj['product_instance']).data





