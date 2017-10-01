# This file is run by the RasPi of the IoT to allow it to communicate with the
# main server through MQTT and with the actual device through an Arduino
#
#To communicate with the sensor:
#   Topic - "sensor"
#
#   To read temp and humidity level:
#       payload - "read_temp"
#   To read from PIR:
#       payload - "read_presence"
#
#Output from temp and humidity level:
#   b'20 *C 71%'
#
#Output from PIR:
#   b'someone_is_here' - if PIR detects motion
#   b'noone_is_here' - if PIR detects noone

import paho.mqtt.client as mqtt
import sys
import serial
import time


ADDR_OF_ARDUINO = '/dev/ttyACM0'
BAUD_RATE = 9600
ADDR_TO_CONN = "172.20.10.7" #connect to Broker
PORT_TO_CONN = 1883

# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    if rc == 0:
        pass
    else:
        sys.exit("Connction refused.") #Broker refused to connect. Exit with error msg.


# The RasPi forwards messages from the publisher to the Arduino
def on_message(client, userdata, msg):
    print("Received")
    topic = str(msg.topic)
    payload = str(msg.payload)
    if topic == "sensor" and payload == b'read_temp' or payload == b'read_presence': #Code only executes if the payload and topic are valid
        ser.write(payload)
        time.sleep(0.5) #blind synchronisation of 0.5s
        data = ser.readline()
        print(data)
        client.publish("sensor_data", payload=data, qos=0, retain=False)


ser = serial.Serial(ADDR_OF_ARDUINO, BAUD_RATE)

client = mqtt.Client(client_id="sensor", clean_session=True, protocol=mqtt.MQTTv311)

client.on_connect = on_connect
client.on_message = on_message

client.connect(ADDR_TO_CONN, port=PORT_TO_CONN) #client connects

client.subscribe("sensor") #subscribe to topic "sensor"

client.loop_forever()
