from rest_framework import status
import json
from rest_framework.response import Response
from rest_framework.views import APIView
from ..models import ProductInstance, Product, Company, ProductIndustry
from ..serializers.product_serializers import ProductInstanceSerializer, ProductSerializer, ProductInstanceCotizationSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser

def convert_units(amount, from_unit, to_unit):
      UNIT_CONVERSIONS = {
            #LB = Libras = Pounds, INCH = Inches = Pulgadas

            'KG': {'KG': 1, 'TON': 1/907.1847, 'G': 1000, 'LB': 2.204623},
            'TON': {'KG': 907.1847, 'TON': 1, 'G': 907184.7, 'LB': 2000},
            'G': {'KG': 1/1000, 'TON': 1/907184.7, 'G': 1, 'LB': 1/453.5924},
            'LB': {'KG': 1/2.204623, 'TON': 1/2000, 'G': 453.5924, 'LB': 1},

            'L': {'L': 1, 'ML': 1000, 'M3': 1/1000, 'CM3': 1000},
            'ML': {'L': 1/1000, 'ML': 1, 'M3': 1/1000000, 'CM3': 1},
            'M3': {'L': 1000, 'ML': 1000000, 'M3': 1, 'CM3': 1000000},
            'CM3': {'L': 1/1000, 'ML': 1, 'M3': 1/1000000,'CM3': 1},

            'EA': {'EA': 1, 'DOZ': 1/12},
            'DOZ': {'EA': 12, 'DOZ': 1},

            'M': {'M': 1, 'CM': 100, 'INCH': 39.37008},
            'CM': {'M': 1/100, 'CM': 1, 'INCH': 0.3937008},
            'INCH': {'M': 1/39.37008, 'CM': 1/0.3937008, 'INCH': 1},
      }

      try:
            return float(amount) * UNIT_CONVERSIONS[from_unit][to_unit]
      except KeyError:
            raise ValueError("Invalid unit conversion")


class GetProductOptionsView(APIView):
      permission_classes = [IsAuthenticated]

      def get(self, request, *args, **kwargs):
            product_names = Product.objects.values_list('name', flat=True).distinct()
            industries = ProductIndustry.objects.values_list('name', flat=True).distinct()

            product_names_list = list(product_names)
            industries_list = list(industries)

            response_data = {
                  'product_names': product_names_list,
                  'industries': industries_list,
            }

            return Response(response_data, status=status.HTTP_200_OK)



class ProductInstanceCreateView(APIView):
      """
      Create a new ProductInstance.
      Validates that the Company RUC, the Product name, and the ProductIndustry name exist by using the serializer.
      """
      serializer_class = ProductInstanceSerializer
      permission_classes = [IsAdminUser]

      def post(self, request, *args, **kwargs):
            serializer = self.serializer_class(data=request.data)

            if serializer.is_valid():
                  serializer.save()
                  return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            

class ProductInstanceCotizator(APIView):
      """
      Cotizator for ProductInstances.
      """
      serializer_class = ProductInstanceCotizationSerializer
      permission_classes = [IsAuthenticated]

      def post(self, request, *args, **kwargs):
            product_name = request.data.get('product_name', '')
            cotization_type = request.data.get('type', '') #bulk, pressed, ground or raw
            amount = float(request.data.get('amount', 0))
            unit_of_measure = request.data.get('unit_of_measure', '') #KG, TON, G, LB, L, ML, M3, CM3, EA, DOZ, M, CM, INCH
            industry_name = request.data.get('industry', '') 

            product_instances = ProductInstance.objects.filter(
                  product__name=product_name,
                  industry__name=industry_name
            )

            if len(product_instances) == 0:
                  return Response({'error': 'No products fit the cotization requirments.'}, status=status.HTTP_404_NOT_FOUND)
            
            cotizations = []

            invalid_units = 0
            for product_instance in product_instances:
                  try:
                        # Calculate cotization based on the given type and unit_of_measure
                        if cotization_type == 'bulk':
                              cotization_price = amount * float(product_instance.bulk_price)
                        elif cotization_type == 'pressed':
                              cotization_price = amount * float(product_instance.pressed_price)
                        elif cotization_type == 'ground':
                              cotization_price = amount * float(product_instance.ground_price)
                        elif cotization_type == 'raw':
                              cotization_price = amount * float(product_instance.raw_material_price)
                        else:
                              return Response({'error': 'Invalid cotization type.'}, status=status.HTTP_400_BAD_REQUEST)

                        # Convert the amount to the corresponding unit_of_measure
                        if unit_of_measure != product_instance.unit_of_measure:
                              try:
                                    cotization_price = convert_units(cotization_price, unit_of_measure, product_instance.unit_of_measure)
                              except ValueError:
                                    invalid_units += 1
                                    continue
                              
                        cotizations.append({
                              'product_instance': product_instance,
                              'cotization_price': cotization_price,
                        })

                  except Exception as e:
                        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

            if invalid_units == len(product_instances):
                  return Response({'error': 'Invalid unit of measure for this product.'}, status=status.HTTP_404_NOT_FOUND)
            if len(cotizations) == 0:
                  return Response({'error': 'No products fit the cotization requirments.'}, status=status.HTTP_404_NOT_FOUND)
            
            # Sort cotizations by price
            cotizations = sorted(cotizations, key=lambda x: x['cotization_price'])

            # Serialize cotizations
            serializer = self.serializer_class(cotizations, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)



