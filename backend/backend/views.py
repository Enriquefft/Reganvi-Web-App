from django.shortcuts import redirect

def redirect_view(request):
    if '/#/' not in request.path:
        response = redirect('/#/')
        return response

    # If the path already includes /#/, no need to redirect
    return None