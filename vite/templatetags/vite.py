import json

from django import template
from django.conf import settings
from django.templatetags.static import static
from django.utils.safestring import mark_safe
from functools import lru_cache


register = template.Library()

@register.simple_tag
@lru_cache(maxsize=None) # No need to read the manifest on every request
def vite_media():
    'Render vite bundle assets'

    if settings.VITE_DEBUG:
      return mark_safe('<script type="module" src="/@vite/client"></script>')

    path = settings.BASE_DIR / 'dist' / 'manifest.json'
    try:
      with open(path, 'r') as fd:
        manifest = json.load(fd)
    except:
        raise Exception('%s not found or invalid' % path)

    index = manifest['index.html']
    return mark_safe(
        '<script type="module" src="%s"></script>' % static(index['file'])
        + '<link rel="stylesheet" type="text/css" href="%s" />' % static(index['css'][0])
        + ''.join('<script type="module" src="%s"></script>' % static(manifest[file]['file'])
            for file in index['imports'])
    )
