from .href import HrefModel


class LinkModel(HrefModel):
  def init(self):
    self.add_property('label')
    super().init()
    self.add_array_property('children', True)
