/* eslint-disable no-unused-vars */
import React from 'react'
import mapboxgl from 'mapbox-gl'
import { useEffect } from 'react'

mapboxgl.accessToken =
  'pk.eyJ1IjoiYmlsbGJvYWgiLCJhIjoiY2xwYWU3ZGUzMDYydzJpcmw4c3hvcHdteSJ9.R0hd7u_Uuh-n-euSJTXo-w'

function Map(props: any) {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-19.29011, 39.39172],
      zoom: 3,
    })
    if (props.pickupCoordinates) {
      addToMap(map, props.pickupCoordinates)
    }

    if (props.dropoffCoordinates) {
      addToMap(map, props.dropoffCoordinates)
    }

    if (props.pickupCoordinates && props.dropoffCoordinates) {
      map.fitBounds([props.pickupCoordinates, props.dropoffCoordinates], {
        padding: 60,
      })
    }
  }, [props.pickupCoordinates, props.dropoffCoordinates])

  const addToMap = (map: mapboxgl.Map, coordinates: mapboxgl.LngLatLike) => {
    const marker1 = new mapboxgl.Marker().setLngLat(coordinates).addTo(map)
  }

  return <div className='h-full flex-1' id='map'></div>
}

export default Map
