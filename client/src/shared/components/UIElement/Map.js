import React, { useRef, useEffect } from "react";
import "ol/ol.css"; // Import OpenLayers CSS
import { Map as OLMap, View} from "ol"; // Import required OpenLayers modules
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { useGeographic } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Icon, Style } from "ol/style";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

import "./Map.css";

const Map = (props) => {
  useGeographic();

  const mapRef = useRef();
  const iconRef = useRef(); // Ref for the icon feature

  const { center, zoom } = props;

  useEffect(() => {
    if (mapRef.current) {
      const map = new OLMap({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: [center.lng, center.lat],
          zoom: zoom,
        }),
      });

      // Remove previous icon feature if it exists
      if (iconRef.current) {
        map.removeLayer(iconRef.current);
      }

      // Create a new icon feature at the given center
      const iconFeature = new Feature({
        geometry: new Point([center.lng, center.lat]),
      });

      // Define the icon style
      const iconStyle = new Style({
        image: new Icon({
          src: require("./location.png"), // Replace with the path to your icon image
          anchor: [0.5, 1], // Center of the icon should be at the location point
        }),
      });

      iconFeature.setStyle(iconStyle);

      // Create a vector layer with the icon feature
      const iconLayer = new VectorLayer({
        source: new VectorSource({
          features: [iconFeature],
        }),
      });

      map.addLayer(iconLayer);

      // Store the icon layer in the ref for future removal
      iconRef.current = iconLayer;
    }
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
      id="map"
    ></div>
  );
};

export default Map;
