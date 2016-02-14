import tornado.web

from content import PAGES


def page_controller(handler_instance, path):
  if path in PAGES:
    handler_instance.write(PAGES[path].serialize())
  else:
    handler_instance.set_status(404)
    handler_instance.write({
      'message': 'A resource was not found for this path.'
    })
