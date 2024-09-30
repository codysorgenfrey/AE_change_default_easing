//70% Easy Ease
var undoGroup = localize('$$$/AE/Script/70_EasyEase/EasyEase70=70% Ease Easy');
app.beginUndoGroup(undoGroup);

var layers = app.project.activeItem.selectedLayers;

if (app.settings.haveSetting('Default Easing', 'Easy Ease') == 0) {
  app.settings.saveSetting('Default Easing', 'Easy Ease', 33);
  app.preferences.saveToDisk();
}

var defaultEasing = app.settings.getSetting('Default Easing', 'Easy Ease');
var ease = new KeyframeEase(0, parseInt(defaultEasing));

for (layer = 0; layer < layers.length; layer++) {
  var layerProps = layers[layer].selectedProperties;

  for (layerProp = 0; layerProp < layerProps.length; layerProp++) {
    var selectedKeys = layerProps[layerProp].selectedKeys;

    if (selectedKeys) {
      for (selectedKey = 0; selectedKey < selectedKeys.length; selectedKey++) {
        var keyInTempEase = layerProps[layerProp].keyInTemporalEase(
          selectedKeys[selectedKey]
        );

        if (keyInTempEase.length == 1) {
          layerProps[layerProp].setTemporalEaseAtKey(
            selectedKeys[selectedKey],
            [ease],
            [ease]
          );
        } else if (keyInTempEase.length == 2) {
          layerProps[layerProp].setTemporalEaseAtKey(
            selectedKeys[selectedKey],
            [ease, ease],
            [ease, ease]
          );
        } else {
          layerProps[layerProp].setTemporalEaseAtKey(
            selectedKeys[selectedKey],
            [ease, ease, ease],
            [ease, ease, ease]
          );
        }
      }
    }
  }
}

app.endUndoGroup();
