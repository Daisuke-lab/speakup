
from django.http import HttpResponse, JsonResponse


def ping(request):
    #health check用
    return HttpResponse("Hello World!!")

