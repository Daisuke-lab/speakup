
from django.http import HttpResponse, JsonResponse
from django.template import RequestContext
from rest_framework.decorators import api_view


def ping(request):
    #health check用
    return HttpResponse("Hello World!!")
