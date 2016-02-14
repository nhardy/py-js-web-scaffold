from collections import OrderedDict


class BaseModel(object):
  _properties = None
  _serializable = None

  def __init__(self, obj=None):
    if obj is None:
      obj = {}
    if isinstance(obj, BaseModel):
      properties = obj.serialize()
    else:
      properties = obj

    self._properties = {}
    self._serializable = OrderedDict()

    self.init()

    for key, value in properties.items():
      if hasattr(self, key):
        setattr(self, key, value)

  def init(self):
    pass

  def __getattr__(self, key):
    if key in self._properties:
      return self._properties[key][0]()

    raise AttributeError

  def __setattr__(self, key, value):
    if self._properties is None:
      super().__setattr__(key, value)
      return

    if key in self._properties:
      self._properties[key][1](value)
      return

    super().__setattr__(key, value)

  def add_property(self, key, default=None, writable=True):
    self._serializable[key] = default

    def getter():
      return self._serializable[key]
    def setter(value):
      if writable:
        self._serializable[key] = value

    self._properties[key] = [getter, setter]

  def add_array_property(self, key, allow_none=False):
    self._serializable[key] = None if allow_none else []

    def getter():
      return self._serializable[key]
    def setter(value):
      assert value is None or isinstance(value, list)
      self._serializable[key] = [] if value is None and not allow_none else value

    self._properties[key] = [getter, setter]

  def add_model_property(self, key, model_class, allow_none=False):
    self._serializable[key] = None if allow_none else model_class()

    def getter():
      return self._serializable[key]
    def setter(value):
      assert value is None or isinstance(value, (dict, OrderedDict, model_class))
      if value is None and not allow_none:
        self._serializable[key] = model_class()
      else:
        self._serializable[key] = model_class(value)

    self._properties[key] = [getter, setter]

  @staticmethod
  def _serialize(obj):
    if isinstance(obj, OrderedDict):
      output = OrderedDict()

      for key, value in obj.items():
        output[key] = BaseModel._serialize(value)

      return output

    if isinstance(obj, list):
      return [BaseModel._serialize(item) for item in obj]

    if isinstance(obj, BaseModel):
      return obj.serialize()

    return obj

  def serialize(self):
    return self._serialize(self._serializable)


