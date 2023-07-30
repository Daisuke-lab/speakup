
from django.http import HttpResponse, JsonResponse
from django.template import RequestContext

def ping(request):
    #health check用
    return HttpResponse("Hello World!!")

