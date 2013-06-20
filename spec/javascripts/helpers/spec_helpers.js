// Add "context" and "xcontent" functions which just act as aliases for "describe" and "xdescribe"
window.context = function(description, specDefinitions) {
  return describe(description, specDefinitions);
};

window.xcontext = function(description, specDefinitions) {
  return xdescribe(description, specDefinitions);
};
