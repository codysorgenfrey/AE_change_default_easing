//100% Ease Out
var undoGroup = localize('$$$/AE/Script/100_EaseOut/EaseOut100=100% Ease Out');
app.beginUndoGroup(undoGroup);

var layers = app.project.activeItem.selectedLayers;
if (app.settings.haveSetting('Default Easing', 'Ease Out') == 0) {
  app.settings.saveSetting('Default Easing', 'Ease Out', 33);
}
var defaultEasing = app.settings.getSetting('Default Easing', 'Ease Out');
var easeIn = new KeyframeEase(0, 0.1);
var easeOut = new KeyframeEase(0, parseInt(defaultEasing));

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
