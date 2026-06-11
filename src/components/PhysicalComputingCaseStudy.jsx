import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, Cpu, Wrench, Database, Layers, Sparkles, Wifi, Globe, Activity, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';

// Reusable Section Component
const Section = ({ title, icon: Icon, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8 }}
    className="mb-24 relative text-left"
  >
    <div className="absolute -left-8 md:-left-12 top-0 h-full w-px bg-gradient-to-b from-[#c5a880]/50 to-transparent hidden md:block"></div>
    <div className="flex items-center space-x-4 mb-8">
      {Icon && (
        <div className="p-3 rounded-full bg-[#c5a880]/10 text-accent border border-[#c5a880]/20">
          <Icon size={24} />
        </div>
      )}
      <h3 className="text-2xl md:text-3xl font-bold font-sans text-white">{title}</h3>
    </div>
    <div className="prose prose-invert max-w-none font-sans text-zinc-300 leading-relaxed">
      {children}
    </div>
  </motion.div>
);

const ExplorationDetail = ({ exp }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  return (
    <div className="p-6 md:p-10 border-t border-white/5 space-y-12 bg-black/[0.15]">
      {/* 1. Slideshow / Cover Image */}
      <div className="space-y-4">
        {exp.slides && exp.slides.length > 0 ? (
          <div className="space-y-4 max-w-4xl mx-auto">
            <div className="w-full aspect-[16/9] overflow-hidden rounded-2xl bg-zinc-950 border border-white/5 relative shadow-2xl group flex items-center justify-center">
              <img 
                src={exp.slides[activeSlideIndex]} 
                alt={`${exp.title} Slide ${activeSlideIndex + 1}`} 
                className="w-full h-full object-contain bg-zinc-950 opacity-95 transition-all duration-300"
              />
              
              {/* Navigation overlay controls */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSlideIndex((prev) => (prev === 0 ? exp.slides.length - 1 : prev - 1));
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 border border-white/10 text-white hover:bg-black/90 hover:scale-105 transition-all opacity-0 group-hover:opacity-100 cursor-pointer flex items-center justify-center text-xl font-bold"
              >
                &larr;
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSlideIndex((prev) => (prev === exp.slides.length - 1 ? 0 : prev + 1));
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 border border-white/10 text-white hover:bg-black/90 hover:scale-105 transition-all opacity-0 group-hover:opacity-100 cursor-pointer flex items-center justify-center text-xl font-bold"
              >
                &rarr;
              </button>
              
              {/* Page Indicator */}
              <div className="absolute bottom-4 right-4 px-4 py-2 rounded-lg bg-black/80 border border-white/10 text-sm font-mono text-zinc-300">
                {activeSlideIndex + 1} / {exp.slides.length}
              </div>
            </div>
            
            {/* Thumbnail Row */}
            <div className="flex gap-3 overflow-x-auto py-2 justify-center">
              {exp.slides.map((slide, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveSlideIndex(idx);
                  }}
                  className={`flex-shrink-0 w-24 aspect-[16/9] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activeSlideIndex === idx 
                      ? "border-accent ring-4 ring-accent/30 scale-95" 
                      : "border-white/5 opacity-40 hover:opacity-100"
                  }`}
                >
                  <img src={slide} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto w-full aspect-[16/9] overflow-hidden rounded-2xl bg-zinc-950 border border-white/5 shadow-2xl">
            <img 
              src={exp.image} 
              alt={exp.title} 
              className="w-full h-full object-cover opacity-90"
            />
          </div>
        )}
      </div>

      <hr className="border-white/5" />

      {/* 2. Objective & Summary */}
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="space-y-3">
          <h4 className="text-accent font-mono text-xs uppercase tracking-widest font-bold">
            Exploration Objective & Overview
          </h4>
          <p className="text-white text-lg md:text-xl font-sans font-light leading-relaxed">
            {exp.objective}
          </p>
          <p className="text-zinc-300 text-base md:text-lg font-sans font-light leading-relaxed">
            {exp.development}
          </p>
        </div>
      </div>

      <hr className="border-white/5" />

      {/* 3. Hardware Pinout & Wiring */}
      <div className="max-w-4xl mx-auto space-y-4">
        <h4 className="text-accent font-mono text-xs uppercase tracking-widest font-bold">
          Hardware Pinout & Connections
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {exp.pins && exp.pins.map((pin, pIdx) => (
            <div key={pIdx} className="p-4 rounded-xl bg-zinc-950 border border-white/5 flex items-center space-x-3 text-sm md:text-base font-mono text-zinc-300">
              <div className="w-2.5 h-2.5 rounded-full bg-accent"></div>
              <span>{pin}</span>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-white/5" />

      {/* 4. Process Steps */}
      <div className="max-w-4xl mx-auto space-y-6">
        <h4 className="text-accent font-mono text-xs uppercase tracking-widest font-bold">
          Key Implementation Steps
        </h4>
        <ul className="space-y-4">
          {exp.process && exp.process.map((step, sIdx) => (
            <li key={sIdx} className="flex items-start text-zinc-300 text-base md:text-lg font-sans leading-relaxed">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm font-mono text-accent mr-4 mt-0.5 font-bold">
                {sIdx + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ul>
      </div>

      <hr className="border-white/5" />

      {/* 5. Key Achievements & Learnings */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div className="space-y-4">
          <h4 className="text-accent font-mono text-xs uppercase tracking-widest font-bold">
            Key Achievements
          </h4>
          <ul className="space-y-3">
            {exp.achievements && exp.achievements.map((ach, aIdx) => (
              <li key={aIdx} className="flex items-start text-zinc-300 text-base md:text-lg font-sans leading-relaxed">
                <span className="text-accent mr-3.5 select-none font-bold">✓</span>
                <span>{ach}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-accent font-mono text-xs uppercase tracking-widest font-bold">
            Key Learnings
          </h4>
          <ul className="space-y-3">
            {exp.learningsList && exp.learningsList.map((learn, lIdx) => (
              <li key={lIdx} className="flex items-start text-zinc-300 text-base md:text-lg font-sans leading-relaxed">
                <span className="text-[#c5a880] mr-3.5 select-none font-bold">★</span>
                <span>{learn}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const PhysicalComputingCaseStudy = ({ onClose, onNavigate }) => {
  const [openIndexes, setOpenIndexes] = useState({ 0: true });

  const explorations = [
    {
      number: "01",
      title: "Ultrasonic Sensor + ThingSpeak",
      image: "/ultrasonic-real-setup.png",
      objective: "Understand distance sensing and cloud-based data logging.",
      process: [
        "Connected TRIG and ECHO pins to Arduino.",
        "Programmed distance calculation logic.",
        "Connected Arduino to WiFi.",
        "Created ThingSpeak channel.",
        "Uploaded data using Write API key."
      ],
      keyLearning: "Learned how physical distance data can be collected, processed, and monitored remotely through IoT cloud services.",
      pins: ["VCC ➔ 5V", "GND ➔ GND", "TRIG ➔ D9", "ECHO ➔ D10"],
      code: `#include <WiFiS3.h>
#include <ThingSpeak.h>

#define TRIG_PIN 9
#define ECHO_PIN 10

#define WIFI_SSID "vibha"
#define WIFI_PASSWORD "12345678"

unsigned long myChannelNumber = 3251447;
const char *myWriteAPIKey = "QF3AXLCUX40G7DJ5";

WiFiClient client;

long duration;
float distance;

void setup() {
  Serial.begin(9600);

  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);

  connectToWiFi();
  ThingSpeak.begin(client);
}

void loop() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);

  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  duration = pulseIn(ECHO_PIN, HIGH);
  distance = duration * 0.034 / 2;

  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");

  ThingSpeak.setField(1, distance);

  int status = ThingSpeak.writeFields(myChannelNumber, myWriteAPIKey);

  if (status == 200) {
    Serial.println("Data sent to ThingSpeak successfully");
  } else {
    Serial.print("ThingSpeak error: ");
    Serial.println(status);
  }

  delay(20000);
}

void connectToWiFi() {
  Serial.print("Connecting to WiFi");

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }

  Serial.println("\nConnected to WiFi");
}`,
      achievements: [
        "Successfully measured distance using an Ultrasonic sensor.",
        "Connected Arduino UNO R4 WiFi to the internet.",
        "Uploaded real-time distance data to ThingSpeak cloud.",
        "Enabled remote monitoring through an online dashboard.",
        "Verified successful communication using HTTP status codes."
      ],
      learningsList: [
        "Understood the working principle of ultrasonic distance measurement.",
        "Learned how to connect Arduino to WiFi.",
        "Gained experience in cloud data uploading using ThingSpeak.",
        "Learned API key authentication for secure data transmission.",
        "Improved debugging and real-time IoT system development skills."
      ],
      communicationFlow: [
        "Ultrasonic Sensor ➔ Arduino: The sensor sends an ultrasonic pulse and receives the echo. Arduino calculates the distance using the time difference.",
        "Arduino ➔ WiFi Router: The calculated distance value is prepared for transmission and Arduino connects to the WiFi network.",
        "WiFi ➔ ThingSpeak Cloud: Using the Write API key, the distance data is uploaded to ThingSpeak via the internet.",
        "ThingSpeak ➔ User Dashboard: The uploaded data is displayed as real-time graphs on the ThingSpeak dashboard."
      ],
      development: "The system was developed by integrating the ultrasonic sensor with Arduino, establishing WiFi connectivity, and connecting to ThingSpeak using an API key for cloud-based distance monitoring.",
      slides: [
        "/ultrasonic-circuit-tinkercad.png",
        "/ultrasonic-thingspeak-chart.png",
        "/ultrasonic-real-setup.png"
      ]
    },
    {
      number: "02",
      title: "Soil Moisture Sensor + ThingSpeak",
      image: "/soil-real-setup.jpg",
      objective: "Understand environmental sensing and periodic cloud updates.",
      process: [
        "Connected soil moisture sensor to Arduino (Pin 7).",
        "Programmed Arduino to read digital soil data.",
        "Connected Arduino to WiFi network.",
        "Created a ThingSpeak channel.",
        "Uploaded soil status using Write API key.",
        "Tested real-time updates on the dashboard."
      ],
      keyLearning: "Explored non-blocking programming techniques and cloud-based environmental monitoring.",
      pins: ["VCC ➔ 5V", "GND ➔ GND", "Signal Pin ➔ D7"],
      code: `#include <WiFiS3.h>
#include <ThingSpeak.h>

#define WIFI_SSID "vibha"
#define WIFI_PASSWORD "12345678"

unsigned long channelID = 3257214;
const char *writeAPIKey = "G3JNEK2NIYTIHW8F";

#define SOIL_DIGITAL_PIN 7

WiFiClient client;
unsigned long lastSensorRead = 0;
unsigned long lastThingSpeakUpdate = 0;
int soilState = 0;

void setup() {
  Serial.begin(9600);
  delay(2000); // important on UNO R4
  pinMode(SOIL_DIGITAL_PIN, INPUT);
  connectToWiFi();
  ThingSpeak.begin(client);
  Serial.println("Soil sensor system started");
}

void loop() {
  unsigned long now = millis();

  // Read soil sensor every 1 second
  if (now - lastSensorRead >= 1000) {
    lastSensorRead = now;
    soilState = digitalRead(SOIL_DIGITAL_PIN);
    Serial.print("Soil State: ");
    Serial.println(soilState == LOW ? "DRY" : "WET");
  }

  // Upload to ThingSpeak every 20 seconds
  if (now - lastThingSpeakUpdate >= 20000) {
    lastThingSpeakUpdate = now;
    // Convert to 1/0 for ThingSpeak
    int soilValue = (soilState == LOW) ? 0 : 1;
    ThingSpeak.writeField(channelID, 1, soilValue, writeAPIKey);
    Serial.println("Uploaded soil data to ThingSpeak");
  }
}

void connectToWiFi() {
  Serial.print("Connecting to Wi-Fi");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnected to Wi-Fi");
}`,
      achievements: [
        "Successfully detected soil moisture condition (DRY/WET).",
        "Connected Arduino UNO R4 WiFi to the internet.",
        "Uploaded soil condition data to ThingSpeak cloud platform.",
        "Implemented timed data updates using millis() for efficient operation.",
        "Enabled remote monitoring of soil status."
      ],
      learningsList: [
        "Understood digital soil moisture sensor working principle.",
        "Learned non-blocking timing using millis() instead of delay.",
        "Gained experience in WiFi-based IoT communication.",
        "Learned how to upload data to ThingSpeak using API keys.",
        "Improved system design for real-time environmental monitoring."
      ],
      communicationFlow: [
        "Soil Moisture Sensor ➔ Arduino: Sensor detects soil condition (DRY/WET) and sends a digital signal to Arduino.",
        "Arduino ➔ WiFi Router: Arduino processes the signal and connects to the WiFi network.",
        "WiFi ➔ ThingSpeak Cloud: The soil data (0 or 1) is uploaded to ThingSpeak using the Write API key.",
        "ThingSpeak ➔ User Dashboard: The data is displayed online for remote monitoring."
      ],
      development: "The system was developed by integrating a digital soil moisture sensor with Arduino, establishing WiFi connectivity, and enabling cloud-based monitoring through ThingSpeak with timed data updates using millis().",
      slides: [
        "/soil-circuit-tinkercad.png",
        "/soil-thingspeak-chart.png",
        "/soil-real-setup.jpg"
      ]
    },
    {
      number: "03",
      title: "DHT22 Sensor + ThingSpeak",
      image: "/dht22-real-setup.png",
      objective: "Monitor temperature and humidity data in real time.",
      process: [
        "Connected DHT22 sensor to Arduino.",
        "Collected temperature and humidity readings.",
        "Established WiFi communication.",
        "Created multi-field ThingSpeak channels for visualization."
      ],
      keyLearning: "Learned how multiple environmental parameters can be collected and visualized simultaneously.",
      pins: ["VCC ➔ 5V / 3.3V", "GND ➔ GND", "Data Pin ➔ D2"],
      code: `#include <WiFiS3.h>
#include <ThingSpeak.h>
#include <DHT.h>

#define WIFI_SSID "vibha"
#define WIFI_PASSWORD "12345678"

unsigned long channelID = 3257165;
const char *writeAPIKey = "A2EITJLDXGL6X19Q";

#define DHTPIN 2
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);
WiFiClient client;

unsigned long lastSensorRead = 0;
unsigned long lastThingSpeakUpdate = 0;
float temperature = 0;
float humidity = 0;

void setup() {
  Serial.begin(9600);
  delay(2000);
  dht.begin();
  connectToWiFi();
  ThingSpeak.begin(client);
  Serial.println("DHT22 system started");
}

void loop() {
  unsigned long now = millis();

  // Read DHT22 every 2 seconds
  if (now - lastSensorRead >= 2000) {
    lastSensorRead = now;
    humidity = dht.readHumidity();
    temperature = dht.readTemperature();
    if (isnan(humidity) || isnan(temperature)) {
      Serial.println("Failed to read from DHT22");
      return;
    }
    Serial.print("Temp: ");
    Serial.print(temperature);
    Serial.print(" *C | Humidity: ");
    Serial.print(humidity);
    Serial.println(" %");
  }

  // Upload to ThingSpeak every 20 seconds
  if (now - lastThingSpeakUpdate >= 20000) {
    lastThingSpeakUpdate = now;
    ThingSpeak.setField(1, temperature); // Field 1 = Temp
    ThingSpeak.setField(2, humidity);    // Field 2 = Humidity
    ThingSpeak.writeFields(channelID, writeAPIKey);
    Serial.println("Uploaded DHT22 data to ThingSpeak");
  }
}

void connectToWiFi() {
  Serial.print("Connecting to Wi-Fi");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnected to Wi-Fi");
}`,
      achievements: [
        "Successfully monitored temperature and humidity data in real time.",
        "Connected Arduino UNO R4 WiFi to the internet.",
        "Uploaded temperature and humidity data points simultaneously to ThingSpeak.",
        "Configured multi-field dashboards on the cloud channel."
      ],
      learningsList: [
        "Understood how to read data from DHT22 serial sensor.",
        "Configured multiple parameters to be sent in a single cloud transaction.",
        "Handled data polling intervals and ThingSpeak rate limits."
      ],
      communicationFlow: [
        "DHT22 Sensor ➔ Arduino: Reads temperature and humidity from the environment.",
        "Arduino ➔ WiFi Router: Establishes internet connection and prepares multi-field payload.",
        "WiFi ➔ ThingSpeak Cloud: Pushes temperature and humidity data in a single multi-field payload.",
        "ThingSpeak ➔ User Dashboard: Telemetry graphs show real-time temperature and humidity plots."
      ],
      development: "Developed using DHT22 digital temperature/humidity sensor connected to a digital inputs bus, querying values via timed library loops, and sending data to ThingSpeak.",
      slides: [
        "/dht22-real-setup.png",
        "/dht22-thingspeak-chart.png"
      ]
    },
    {
      number: "04",
      title: "DHT22 Sensor + Firebase Realtime Database",
      image: "/dht22-firebase-setup.png",
      objective: "Explore cloud databases and secure IoT communication.",
      process: [
        "Connected DHT22 sensor to Arduino.",
        "Programmed Arduino to read temperature and humidity.",
        "Connected Arduino to WiFi network.",
        "Created Firebase Realtime Database.",
        "Converted sensor data into JSON format.",
        "Sent data to Firebase using HTTPS.",
        "Tested and verified data upload."
      ],
      keyLearning: "Understood database-driven IoT systems, JSON formatting, HTTPS communication, and cloud data storage.",
      pins: ["VCC ➔ 5V / 3.3V", "GND ➔ GND", "Data Pin ➔ D2"],
      code: `#include <WiFiS3.h>
#include <ArduinoHttpClient.h>
#include <DHT.h>

#define WIFI_SSID "vibha"
#define WIFI_PASSWORD "12345678"

char server[] = "project1-c1331-default-rtdb.asia-southeast1.firebasedatabase.app";

#define DHTPIN 2
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);

// SSL client for secure HTTPS
WiFiSSLClient wifi;
HttpClient client = HttpClient(wifi, server, 443);

void setup() {
  Serial.begin(9600);
  dht.begin();
  Serial.print("Connecting to WiFi");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi Connected");
}

void loop() {
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();
  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Failed to read DHT22");
    delay(2000);
    return;
  }
  Serial.print("Temp: ");
  Serial.print(temperature);
  Serial.print(" °C | Humidity: ");
  Serial.print(humidity);
  Serial.println(" %");

  String path = "/DHT22.json";
  String jsonData = "{";
  jsonData += "\"Temperature\":" + String(temperature) + ",";
  jsonData += "\"Humidity\":" + String(humidity);
  jsonData += "}";

  client.put(path, "application/json", jsonData);

  int statusCode = client.responseStatusCode();
  String response = client.responseBody();
  Serial.print("Firebase HTTP Status: ");
  Serial.println(statusCode);

  client.stop();
  delay(5000);
}`,
      achievements: [
        "Successfully connected Arduino UNO R4 WiFi to the internet.",
        "Collected real-time temperature and humidity data using DHT22.",
        "Sent sensor data securely to Firebase using HTTPS.",
        "Structured and uploaded data in JSON format.",
        "Built a working cloud-based IoT monitoring system."
      ],
      learningsList: [
        "Understood complete IoT workflow (Sensor ➔ Arduino ➔ Cloud).",
        "Learned how HTTP requests and Firebase integration work.",
        "Gained experience in JSON data formatting.",
        "Implemented secure communication using SSL.",
        "Improved debugging and real-time data handling skills."
      ],
      communicationFlow: [
        "DHT22 Sensor ➔ Arduino: The sensor measures temperature and humidity and sends the data to the Arduino.",
        "Arduino ➔ WiFi Router: Arduino processes the data and connects to the WiFi network.",
        "WiFi ➔ Firebase Cloud (HTTPS): Using a secure SSL connection, the Arduino sends the data to Firebase via an HTTP PUT request.",
        "Firebase ➔ User Interface: The uploaded data can be accessed remotely through the Firebase dashboard or a connected app."
      ],
      development: "The system was developed by first integrating the DHT22 sensor with Arduino, establishing WiFi connectivity, setting up Firebase for cloud storage, and securing HTTPS communication was implemented and tested to ensure reliable real-time data transmission.",
      slides: [
        "/dht22-firebase-setup.png",
        "/dht22-firebase-database.png"
      ]
    },
    {
      number: "05",
      title: "Rain Sensor + Firebase",
      image: "/rain-sensor-setup.png",
      objective: "Measure rainfall intensity and transmit structured data.",
      process: [
        "Connected rain sensor to Arduino (A0 & Pin 7).",
        "Programmed rain intensity calculation using map().",
        "Connected Arduino to WiFi.",
        "Created Firebase Realtime Database.",
        "Sent data using HTTPS (WiFiSSLClient)."
      ],
      keyLearning: "Learned sensor calibration, data conversion, cloud communication, and environmental monitoring workflows.",
      pins: ["VCC ➔ 5V", "GND ➔ GND", "Analog Pin ➔ A0", "Digital Pin ➔ D7"],
      code: `#include <WiFiS3.h>
#include <ArduinoHttpClient.h>

#define WIFI_SSID "vibha"
#define WIFI_PASSWORD "12345678"

char server[] = "rain-sensor-1ee31-default-rtdb.asia-southeast1.firebasedatabase.app";

#define RAIN_ANALOG A0
#define RAIN_DIGITAL 7

// SSL client
WiFiSSLClient wifi;
HttpClient client = HttpClient(wifi, server, 443);

void setup() {
  Serial.begin(9600);
  pinMode(RAIN_DIGITAL, INPUT);
  Serial.print("Connecting to WiFi");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi Connected");
}

void loop() {
  // Read Rain Sensor
  int rainAnalog = analogRead(RAIN_ANALOG);
  int rainDigital = digitalRead(RAIN_DIGITAL);

  // Convert analog to percentage (0 = heavy rain, 100 = dry)
  int rainPercent = map(rainAnalog, 1023, 0, 0, 100);
  rainPercent = constrain(rainPercent, 0, 100);

  Serial.print("Rain Analog: ");
  Serial.print(rainAnalog);
  Serial.print(" | Rain %: ");
  Serial.print(rainPercent);
  Serial.print(" | Digital: ");
  Serial.println(rainDigital == LOW ? "RAIN DETECTED" : "DRY");

  // Send to Firebase
  String path = "/RainSensor.json";
  String jsonData = "{";
  jsonData += "\"RainLevel\":" + String(rainPercent) + ",";
  jsonData += "\"RawAnalog\":" + String(rainAnalog) + ",";
  jsonData += "\"RainDetected\":" + String(rainDigital == LOW ? 1 : 0);
  jsonData += "}";

  client.put(path, "application/json", jsonData);

  int statusCode = client.responseStatusCode();
  String response = client.responseBody();
  Serial.print("Firebase HTTP Status: ");
  Serial.println(statusCode);

  client.stop();
  delay(5000);
}`,
      achievements: [
        "Successfully detected rainfall using analog and digital outputs.",
        "Converted raw analog values into rain percentage (0–100%).",
        "Connected Arduino UNO R4 WiFi to the internet.",
        "Uploaded real-time rain data securely to Firebase using HTTPS.",
        "Implemented continuous cloud-based rain monitoring."
      ],
      learningsList: [
        "Understood working of rain sensor (analog + digital signals).",
        "Learned data conversion using map() and constrain() functions.",
        "Gained experience in HTTPS communication using WiFiSSLClient.",
        "Learned JSON data structuring for Firebase.",
        "Improved debugging using HTTP status codes and Serial Monitor."
      ],
      communicationFlow: [
        "Rain Sensor ➔ Arduino: Rain sensor detects water. Arduino reads analog & digital signals.",
        "Arduino ➔ WiFi Router: Arduino connects to WiFi.",
        "WiFi ➔ Firebase Cloud: Data is sent via HTTPS.",
        "Firebase ➔ User Dashboard: Firebase stores data and user views data remotely."
      ],
      development: "The system was developed by integrating a rain sensor with Arduino, enabling WiFi connectivity, converting sensor readings into structured data, and securely uploading it to Firebase for real-time monitoring.",
      slides: [
        "/rain-sensor-setup.png",
        "/rain-sensor-database.png"
      ]
    }
  ];

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ type: "spring", bounce: 0, duration: 0.6 }}
      className="fixed inset-0 z-[100] bg-[#161513] overflow-hidden shadow-2xl case-study-overlay"
      style={{
        backgroundImage: 'radial-gradient(rgba(197, 168, 128, 0.15) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        backgroundAttachment: 'local'
      }}
    >
      <div className="w-full h-full flex flex-col overflow-hidden">
        {/* Sticky Top Bar */}
        <div className="flex-shrink-0 w-full bg-[#161513]/85 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button 
              onClick={onClose}
              className="flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors font-mono text-xs uppercase tracking-wider group cursor-pointer"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <span>Close Case Study</span>
            </button>
            <span className="h-4 w-px bg-white/10 hidden sm:block"></span>
            <span className="text-zinc-500 font-mono text-xs tracking-widest uppercase hidden sm:block">
              Case Study // 05 // Physical Computing Explorations
            </span>
          </div>
          
          <button 
            onClick={onClose}
            className="p-2 rounded-full border border-white/10 hover:border-white/20 bg-white/[0.02] text-zinc-400 hover:text-white transition-all cursor-pointer hover:scale-105"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Content wrapper */}
        <div className="flex-grow overflow-y-auto overflow-x-hidden w-full">
          {/* Main Content Wrapper */}
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        
        {/* HERO TITLE BLOCK */}
        <div className="mb-16 md:mb-24 text-left">
          <div className="flex items-center space-x-2 mb-4">
            <span className="font-mono text-xs text-accent tracking-[0.2em] uppercase border border-accent/20 bg-accent/5 px-3 py-1 rounded-full">
              IoT & Circuit Design
            </span>
            <span className="font-mono text-xs text-zinc-400 tracking-[0.2em] uppercase">
              // Hardware & Sensor Integration
            </span>
          </div>
          <h1 className="font-black uppercase leading-[0.85] text-[clamp(2.5rem,7vw,5.5rem)] flex flex-col mb-8 tracking-tighter select-none">
            <span style={{
              background: 'linear-gradient(110deg, #ffffff 30%, #e5dfd5 60%, #c5a880 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }} className="inline-block font-sans">PHYSICAL</span>
            <span style={{
              background: 'linear-gradient(110deg, #ffffff 30%, #e5dfd5 60%, #c5a880 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }} className="inline-block font-sans">COMPUTING</span>
          </h1>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8 border border-white/5 bg-[#141413] rounded-3xl font-sans text-sm shadow-xl relative overflow-hidden mt-12">
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block font-mono">My Focus</span>
              <span className="text-white font-bold leading-relaxed block">Environmental Sensing & IoT Networking</span>
            </div>
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block font-mono">Platform</span>
              <span className="text-white font-bold leading-relaxed block">Arduino UNO R4 WiFi</span>
            </div>
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block font-mono">Protocols</span>
              <span className="text-white font-bold leading-relaxed block">HTTPS, MQTT, Serial API</span>
            </div>
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block font-mono">Timeline</span>
              <span className="text-white font-bold leading-relaxed block">Self-driven exploration</span>
            </div>
          </div>
        </div>

        {/* SECTION 1: PROJECT OVERVIEW */}
        <Section title="Project Overview" icon={Globe}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
            <div className="lg:col-span-8 space-y-6 text-left">
              <p className="text-xl md:text-2xl font-sans text-zinc-200 font-light leading-relaxed">
                This project was a self-driven exploration of physical computing, environmental sensing, IoT communication systems, and data visualization using the Arduino UNO R4 WiFi.
              </p>
              <p className="text-zinc-300 text-base md:text-lg font-sans leading-relaxed">
                The goal was not to build a single final product, but to understand how physical sensors collect environmental data and how that data can be transmitted, stored, visualized, and monitored through different cloud communication systems.
              </p>
              <p className="text-zinc-300 text-base md:text-lg font-sans leading-relaxed">
                Throughout the project, I experimented with multiple sensors, cloud platforms, communication protocols, and real-time monitoring workflows.
              </p>
            </div>
            
            <div className="lg:col-span-4 rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 aspect-[4/3] lg:aspect-[4/5] max-h-[360px]">
              <img 
                src="/physical-computing-cover.png" 
                alt="Arduino microcontroller circuit board with sensor wiring" 
                className="w-full h-full object-cover opacity-90"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/5 pt-12">
            <div>
              <h4 className="text-white font-sans font-bold text-xl mb-4 flex items-center gap-2 text-accent">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                My Role
              </h4>
              <ul className="grid grid-cols-2 gap-y-3 gap-x-6 text-base md:text-lg font-sans text-zinc-300 pl-4 list-disc">
                <li>Physical Computing</li>
                <li>Circuit Design</li>
                <li>Sensor Integration</li>
                <li>Arduino Programming</li>
                <li>IoT System Design</li>
                <li>Cloud Communication</li>
                <li>Data Visualization</li>
                <li>Testing & Debugging</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-sans font-bold text-xl mb-4 flex items-center gap-2 text-accent">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                Tools & Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "Arduino UNO R4 WiFi", "Ultrasonic Sensor", "Soil Moisture Sensor",
                  "DHT22 Temp & Humidity Sensor", "Rain Sensor", "ThingSpeak",
                  "Firebase Realtime Database", "MQTTX", "WiFi Communication",
                  "HTTPS Requests", "MQTT Protocol", "Arduino IDE"
                ].map((tool, idx) => (
                  <span 
                    key={idx} 
                    className="text-sm font-mono text-zinc-300 border border-white/10 bg-white/[0.02] px-3.5 py-2 rounded-lg"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* SECTION 2: HARDWARE EXPLORATIONS */}
        <Section title="Hardware Explorations" icon={Cpu}>
          <div className="space-y-4 max-w-5xl mx-auto">
            {explorations.map((exp, idx) => {
              const isOpen = !!openIndexes[idx];
              return (
                <div 
                  key={idx}
                  id={`exploration-card-${idx}`}
                  className={`border transition-all duration-300 rounded-2xl overflow-hidden ${
                    isOpen 
                      ? 'border-[#c5a880]/30 bg-[#1c1b18]/40 shadow-lg' 
                      : 'border-white/5 bg-[#141413]/40 hover:bg-[#141413]/70 hover:border-white/10'
                  }`}
                >
                  <button
                    onClick={() => {
                      const willOpen = !isOpen;
                      setOpenIndexes(prev => ({ ...prev, [idx]: willOpen }));
                      if (willOpen) {
                        setTimeout(() => {
                          const element = document.getElementById(`exploration-card-${idx}`);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }, 150);
                      }
                    }}
                    className="w-full flex items-center justify-between p-6 md:p-8 text-left transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center space-x-6">
                      <span className={`font-mono text-lg md:text-xl font-bold transition-colors duration-300 ${
                        isOpen ? 'text-accent' : 'text-zinc-600 group-hover:text-zinc-400'
                      }`}>
                        {exp.number}
                      </span>
                      <h4 className="text-white font-bold font-sans text-base md:text-lg md:text-xl tracking-tight uppercase group-hover:text-accent transition-colors duration-300">
                        {exp.title}
                      </h4>
                    </div>
                    <div className={`p-2 rounded-full border transition-all duration-300 ${
                      isOpen 
                        ? 'border-[#c5a880]/30 bg-[#c5a880]/10 text-accent' 
                        : 'border-white/10 text-zinc-500 hover:text-white'
                    }`}>
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <ExplorationDetail exp={exp} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Section>

        {/* SECTION 3: COMMUNICATION SYSTEMS */}
        <Section title="Communication Systems Explored" icon={Database}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01]">
              <h4 className="text-white font-sans font-bold text-lg mb-3 flex items-center gap-2 text-accent">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                ThingSpeak
              </h4>
              <ul className="text-zinc-300 text-sm font-sans space-y-2">
                <li>• Cloud dashboards</li>
                <li>• API-based data uploads</li>
                <li>• Real-time sensor visualization</li>
              </ul>
            </div>
            <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01]">
              <h4 className="text-white font-sans font-bold text-lg mb-3 flex items-center gap-2 text-accent">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                Firebase Database
              </h4>
              <ul className="text-zinc-300 text-sm font-sans space-y-2">
                <li>• Database-driven IoT architecture</li>
                <li>• JSON data structures</li>
                <li>• Secure HTTPS communication</li>
              </ul>
            </div>
            <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01]">
              <h4 className="text-white font-sans font-bold text-lg mb-3 flex items-center gap-2 text-accent">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                MQTTX
              </h4>
              <ul className="text-zinc-300 text-sm font-sans space-y-2">
                <li>• Publish-subscribe architecture</li>
                <li>• Broker-based communication</li>
                <li>• Lightweight real-time messaging</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* SECTION 4: KEY OUTCOMES */}
        <Section title="Key Outcomes" icon={CheckCircle2}>
          <div className="border border-white/5 rounded-2xl bg-white/[0.01] p-8 space-y-4 text-left">
            <p className="text-zinc-300 text-sm md:text-base font-sans pl-1">
              Through designing and programming these systems, the project completed the following milestones:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-zinc-300 text-sm font-sans pl-5 list-disc leading-relaxed">
              <li>Built and tested 6 sensor communication workflows.</li>
              <li>Explored multiple environmental sensing systems.</li>
              <li>Learned cloud-based monitoring architectures.</li>
              <li>Implemented WiFi, HTTPS, API, and MQTT communication.</li>
              <li>Developed practical understanding of end-to-end IoT systems from sensing to visualization.</li>
              <li>Strengthened skills in debugging hardware-software interactions and real-time data transmission.</li>
            </ul>
          </div>
        </Section>

        {/* SECTION 5: REFLECTION */}
        <Section title="Reflection" icon={Sparkles}>
          <div className="relative p-10 md:p-14 border border-[#c5a880]/20 bg-[#1e1d1b] rounded-3xl text-center max-w-4xl mx-auto shadow-2xl overflow-hidden mt-8">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#c5a880]/30" />
            <span className="text-8xl text-[#c5a880]/10 font-serif absolute -top-2 left-6 pointer-events-none select-none">“</span>
            <p className="text-zinc-200 text-lg md:text-2xl font-serif italic leading-relaxed relative z-10 font-medium">
              This project shifted my understanding of physical computing from isolated sensor experiments to complete connected systems. By working across multiple sensors, cloud platforms, and communication protocols, I learned how physical environments can be translated into digital information and monitored remotely through scalable IoT infrastructures.
            </p>
            <span className="text-8xl text-[#c5a880]/10 font-serif absolute -bottom-14 right-6 pointer-events-none select-none">”</span>
            <div className="mt-8 font-mono text-xs text-accent uppercase tracking-widest">— Project Reflection</div>
          </div>
        </Section>

        {/* Cinematic Split Image Navigation Footer */}
        <div className="mt-28 pt-12 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Previous Project Card */}
            <div 
              onClick={() => onNavigate('scrap-garden')}
              className="group relative cursor-pointer overflow-hidden rounded-2xl h-28 md:h-32 border border-white/5 bg-zinc-950 flex flex-col justify-end p-6 text-left"
            >
              <img 
                src="/scrapgarden-cover.jpg" 
                alt="Scrap Garden" 
                className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              <div className="relative z-10 space-y-0.5">
                <span className="text-zinc-400 font-mono text-[9px] uppercase block tracking-wider">Tangible Electronics</span>
                <h4 className="text-white text-xl md:text-2xl font-black uppercase font-sans tracking-tight group-hover:text-accent transition-colors duration-300">
                  ← PREVIOUS PROJECT
                </h4>
                <span className="text-zinc-400 text-[10px] md:text-xs font-normal tracking-wider font-mono block group-hover:text-zinc-200 transition-colors duration-300">
                  SCRAP GARDEN
                </span>
              </div>
            </div>

            {/* Next Project Card */}
            <div 
              onClick={() => onNavigate('geospatial')}
              className="group relative cursor-pointer overflow-hidden rounded-2xl h-28 md:h-32 border border-[#c5a880]/15 hover:border-[#c5a880]/30 bg-zinc-950 flex flex-col justify-end p-6 text-right items-end"
            >
              <img 
                src="/geo-map-3.png" 
                alt="Geospatial Visualisation" 
                className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              <div className="relative z-10 space-y-0.5">
                <span className="text-zinc-400 font-mono text-[9px] uppercase block tracking-wider">Cyclone Vulnerability Mapping</span>
                <h4 className="text-white text-xl md:text-2xl font-black uppercase font-sans tracking-tight group-hover:text-accent transition-colors duration-300">
                  NEXT PROJECT →
                </h4>
                <span className="text-zinc-400 text-[10px] md:text-xs font-normal tracking-wider font-mono block group-hover:text-zinc-200 transition-colors duration-300">
                  GEOSPATIAL VISUALISATION
                </span>
              </div>
            </div>

          </div>

          <div className="mt-10 flex justify-center">
            <button 
              onClick={onClose}
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer border border-white/10 hover:border-white/20 px-6 py-2.5 rounded-xl bg-white/[0.01] font-mono text-xs uppercase tracking-wider"
            >
              Return to Portfolio
            </button>
          </div>
        </div>

      </div>
        </div>
      </div>

      {/* Modal is no longer needed since details open directly in accordions */}
    </motion.div>
  );
};

export default PhysicalComputingCaseStudy;
