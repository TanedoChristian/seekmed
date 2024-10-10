import React, { useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import OrderDetailsModal from "../Rider/OrderDetailsModal";

export default function Map({ lat, lon, order }) {
    console.log(order);
    const position = [lat, lon];
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div
            style={{ position: "relative", width: "100%", height: "27vh" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <MapContainer
                center={position}
                zoom={20}
                scrollWheelZoom={false}
                style={{ height: "27vh", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>

            {isHovered && <OrderDetailsModal order={order} />}
        </div>
    );
}
