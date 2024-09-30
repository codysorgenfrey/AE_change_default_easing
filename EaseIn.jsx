//100% Ease In
var undoGroup = localize('$$$/AE/Script/100_EaseIn/EaseIn100=100% Ease In');
app.beginUndoGroup(undoGroup);

var layers = app.project.activeItem.selectedLayers;
if (app.settings.haveSetting('Default Easing', 'Ease In') == 0) {
  app.settings.saveSetting('Default Easing', 'Ease In', 33);
  app.preferences.saveToDisk();
}
var defaultEasing = app.settings.getSetting('Default Easing', 'Ease In');
var easeIn = new KeyframeEase(0, parseInt(defaultEasing));
var easeOut = new KeyframeEase(0, 0.1);

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
            [easeIn],
            [easeOut]
          );
        } else if (keyInTempEase.length == 2) {
          layerProps[layerProp].setTemporalEaseAtKey(
            selectedKeys[selectedKey],
            [easeIn, easeIn],
            [easeOut, easeOut]
          );
        } else {
          layerProps[layerProp].setTemporalEaseAtKey(
            selectedKeys[selectedKey],
            [easeIn, easeIn, easeIn],
            [easeOut, easeOut, easeOut]
          );
        }
      }
    }
  }
}

app.endUndoGroup();
