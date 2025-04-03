"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "vercel-build": "next build"
},
"dependencies": {
  "next": "^13.0.0",
  "react": "^18.0.0",
  "react-dom": "^18.0.0"
}



import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const symptomResponses = {
  "Fever": "You may have an infection or flu. Stay hydrated, rest, and monitor your temperature.<br/><br/><span style='color:blue; font-weight:bold;'>Medication:</span> <span style='color:red; font-weight:bold;'>Paracetamol (500mg)</span> for fever reduction.",
  "Fatigue": "Fatigue can be due to stress, anemia, or lack of sleep. Ensure adequate rest and proper nutrition.<br/><br/><span style='color:blue; font-weight:bold;'>Medication:</span> <span style='color:red; font-weight:bold;'>Vitamin B12 supplements</span> if deficient.",
  "Chills": "Chills are often associated with infections like flu. Keep warm and monitor for fever.<br/><br/><span style='color:blue; font-weight:bold;'>Medication:</span> <span style='color:red; font-weight:bold;'>Paracetamol</span> for fever management.",
  "Weakness": "Weakness can result from dehydration, infections, or vitamin deficiencies. Stay hydrated and eat nutritious food.<br/><br/><span style='color:blue; font-weight:bold;'>Medication:</span> <span style='color:red; font-weight:bold;'>Electrolyte solution</span> to replenish energy.",
  "Cough": "A cough can result from infections, allergies, or irritants. Drink warm fluids and use a humidifier.<br/><br/><span style='color:blue; font-weight:bold;'>Medication:</span> <span style='color:red; font-weight:bold;'>Dextromethorphan</span> for dry cough, <span style='color:red; font-weight:bold;'>Guaifenesin</span> for wet cough.<br/><br/><span style='color:green; font-weight:bold;'>Doctor's Recommendation:</span> If coughing persists more than 2 weeks, consult a physician.",
  "Headache": "Headaches can be due to stress, dehydration, or migraines. Rest in a quiet place and stay hydrated.<br/><br/><span style='color:blue; font-weight:bold;'>Medication:</span> <span style='color:red; font-weight:bold;'>Ibuprofen</span> or <span style='color:red; font-weight:bold;'>Acetaminophen</span> for pain relief.",
};

const mythFacts = [
  { myth: "Cold weather causes colds.", fact: "Colds are caused by viruses, not cold weather itself." },
  { myth: "You should starve a fever.", fact: "Proper nutrition and hydration are essential for recovery." },
  { myth: "Cracking knuckles causes arthritis.", fact: "There is no scientific evidence linking knuckle cracking to arthritis." },
];

export default function FirstAidBot() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [showMythFact, setShowMythFact] = useState(false);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const getResponse = () => {
    const symptom = Object.keys(symptomResponses).find((key) =>
      userInput.toLowerCase().includes(key.toLowerCase())
    );
    setResponse(symptom ? symptomResponses[symptom] : "I couldn't find an exact match. Please describe your symptoms in more detail!");
  };

  const showNextFact = () => {
    setCurrentFactIndex((prevIndex) => (prevIndex + 1) % mythFacts.length);
    setShowMythFact(true);
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <header className="text-center py-6">
        <h1 className="text-3xl font-bold">First Aid Chatbot</h1>
      </header>
      <nav className="flex justify-center space-x-4 py-4">
        <Button onClick={showNextFact}>Myth vs Fact Checker</Button>
        <Button onClick={() => window.location.href = 'tel:108'}>Need Help? Call 108</Button>
        <Switch checked={darkMode} onCheckedChange={setDarkMode} />
      </nav>
      <main className="flex justify-center items-center py-10">
        <Card className="w-full max-w-lg p-6 bg-white text-black rounded-xl shadow-lg">
          <CardContent>
            <Input placeholder="Type your symptoms..." value={userInput} onChange={handleInputChange} className="mb-4" />
            <Button className="w-full" onClick={getResponse}>Get Advice</Button>
            {response && <p className="mt-4 text-lg" dangerouslySetInnerHTML={{ __html: response }} />}
            {showMythFact && (
              <div className="mt-6 p-4 bg-green-200 rounded-md">
                <h2 className="text-lg font-semibold text-green-800">Myth vs Fact</h2>
                <p className="text-black font-medium"><strong>Myth:</strong> {mythFacts[currentFactIndex].myth}</p>
                <p className="text-black"><strong>Fact:</strong> {mythFacts[currentFactIndex].fact}</p>
                <Button className="mt-2 bg-green-500 text-white" onClick={showNextFact}>Next</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <footer className="text-center mt-10 py-4 border-t">
        <p>Developed by Sumit Sulabh & Rabindra Nath Thakur with ❤️</p>
        <p>&copy; 2025 First Aid Bot. All rights reserved.</p>
      </footer>
    </div>
  );
}
