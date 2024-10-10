// import React, { useEffect, useRef, useState } from "react";
// import { MapContainer, TileLayer, useMap } from "react-leaflet";
// import L from "leaflet";

// const MyMap = React.memo(({ lat, lon }) => {
//     const position = [lat, lon];
//     const mapRef = useRef();
//     const markerRef = useRef(null);

//     const [isLoading, setLoading] = useState(false);

//     const LocationHandler = () => {
//         const map = useMap();

//         useEffect(() => {
//             map.locate({ setView: false, maxZoom: 16 });
//             map.on("locationfound", (event) => {
//                 L.marker(event.latlng)
//                     .addTo(map)
//                     .bindTooltip("You are here!", {
//                         permanent: true,
//                         direction: "top",
//                     })
//                     .openTooltip();

//                 const bounds = L.latLngBounds([event.latlng, position]);
//                 map.fitBounds(bounds);
//             });
//             map.on("locationerror", (event) => {
//                 alert(event.message);
//             });

//             if (mapRef.current) {
//                 markerRef.current = L.marker(position)
//                     .addTo(map)
//                     .bindTooltip("Deliver here", {
//                         permanent: true,
//                         direction: "top",
//                     })
//                     .openTooltip();

//                 map.setView(position, 13);
//             }
//         }, [map, position]);
//         return null;
//     };

//     return (
//         <MapContainer
//             ref={mapRef}
//             center={position}
//             zoom={13}
//             style={{ height: "100vh", width: "100%" }}
//         >
//             <TileLayer
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//             />
//             <LocationHandler />
//         </MapContainer>
//     );
// });

// export default MyMap;
