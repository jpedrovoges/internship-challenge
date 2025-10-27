from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .utils import calculate_mmc_interval

class LcmCalculatorView(APIView):
    def get(self, request, format=None):
        try:
            x = int(request.query_params.get('x'))
            y = int(request.query_params.get('y'))

            if x <= 0 or y <= 0 or x >= y:
                return Response(
                    {"error": "Os números devem ser inteiros positivos e x deve ser menor que y."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            mmc_result = calculate_mmc_interval(x, y)

            return Response({"result": mmc_result}, status=status.HTTP_200_OK)

        except (TypeError, ValueError):
            return Response(
                {"error": "Ambos os parâmetros 'x' e 'y' devem ser números inteiros válidos."},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )