import tornado.web
import tornado.httpserver
import tornado.ioloop

from src.config import PORT
from src.handlers import MainHandler

def application():
  return tornado.web.Application(
    [
      (r'/', MainHandler)
    ],
    debug=True,
  )

def run():
  http_server = tornado.httpserver.HTTPServer(application())
  http_server.listen(PORT)
  print('Server is starting...')
  tornado.ioloop.IOLoop.instance().start()
