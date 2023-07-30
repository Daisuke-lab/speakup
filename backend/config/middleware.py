


from utils.jwt_util import JWTUtil


class SpeakUpMiddleware():
    def __init__(self, get_response):
        self.get_response = get_response


    def __call__(self, request):
        response = self.get_response(request)
        

        return response