from rest_framework.generics import CreateAPIView, CreateAPIView, ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from ..models import CompanyInfo, Company
from ..serializers.company_serializers import CompanyInfoSerializer


class CompanyInfoCreateView(CreateAPIView):
      """
      Creates a new CompanyInfo object
      """
      serializer_class = CompanyInfoSerializer
      permission_classes = [IsAuthenticated]

      def perform_create(self, serializer):
            serializer.save(user=self.request.user)

            

class CompanyInfoGetView(APIView):
      """
      Returns the CompanyInfo object associated with the given user
      """
      serializer_class = CompanyInfoSerializer
      permission_classes = [IsAuthenticated]
      
      def get(self, request, *args, **kwargs):
            queryset = CompanyInfo.objects.filter(user=request.user)
            company_info = queryset.first()

            if company_info is None:
                  return Response(status=404)

            serializer = self.serializer_class(company_info)
            return Response(serializer.data)

class CompanyInfoUpdateView(APIView):
      """
      Updates the CompanyInfo object associated with the given user

      If the RUC (Registro Único de Contribuyentes) of the Company object linked to the CompanyInfo is changed:
            - If another Company already exists with the new RUC, it updates the user's Company to that existing Company.
            - If no other Company has the new RUC, it creates a new Company with the updated RUC and links it to the user. 
      """
      serializer_class = CompanyInfoSerializer
      permission_classes = [IsAuthenticated]

      def put(self, request, *args, **kwargs):
            #Get the CompanyInfo object associated with the given user
            queryset = CompanyInfo.objects.filter(user=request.user)
            company_info = queryset.first()

            if company_info is None:
                  return Response(status=404)
            
            current_ruc = company_info.RUC
            current_company = company_info.company
            
            #Extract the data recieved
            serializer = self.serializer_class(company_info, data=request.data, partial=True)

            if serializer.is_valid():
                  new_ruc = serializer.validated_data.get('RUC')
                  new_company_name = serializer.validated_data.get('company_name')

                  if current_ruc != new_ruc:
                        existing_company = Company.objects.filter(RUC=new_ruc).first()

                        if existing_company:
                              company_info.company = existing_company
                        else:
                              new_company_data = serializer.validated_data.get('company', {})
                              new_company_data['RUC'] = new_ruc
                              new_company_data['company_name'] = new_company_name
                              new_company = Company.objects.create(**new_company_data)
                              company_info.company = new_company

                        serializer.save()
                        return Response(serializer.data)

                  serializer.save()
                  return Response(serializer.data)

            return Response(serializer.errors, status=400)

class CompanyInfoDeleteView(APIView):
      """
      Deletes the CompanyInfo object associated with the given user.
      If the Company related to the CompanyInfo has no other associated objects,
      it is also deleted.
      """
      serializer_class = CompanyInfoSerializer
      permission_classes = [IsAuthenticated]

      def delete(self, request, *args, **kwargs):
            # Get the CompanyInfo object associated with the given user
            queryset = CompanyInfo.objects.filter(user=request.user)
            company_info = queryset.first()

            if company_info is None:
                  return Response(status=404)

            company = company_info.company

            # Delete the CompanyInfo object
            company_info.delete()

            # Check if the Company has no more associated CompanyInfo objects, and delete it if necessary
            if company.company_info.count() == 0:
                  company.delete()

            return Response(status=204)


class CompanyCreateView(CreateAPIView):
      serializer_class = CompanyInfoSerializer
      permission_classes = [IsAdminUser]

      def perform_create(self, serializer):
            serializer.save()
