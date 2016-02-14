from .base import BaseModel


class TextModel(BaseModel):
  def __init__(self, obj=None):
    if isinstance(obj, str):
      properties = {'text': obj}
    else:
      properties = obj
    super().__init__(properties)

  def init(self):
    self.add_property('type', 'text', False)
    self.add_property('text')
    self.add_property('del', False)
    self.add_property('emphasis', False)
    self.add_property('strong', False)
    self.add_property('underline', False)
