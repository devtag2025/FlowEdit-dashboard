"use client"
import { useEffect, useRef } from "react";

export default function NotFound() {
  const svgRef = useRef(null);

  useEffect(() => {
    
    const svg = svgRef.current;
    if (!svg) return;

    const handboy = svg.querySelector("#handboy");
    const girllight = svg.querySelector("#girllight");
    const hairgirl = svg.querySelector("#hairgirl");
    const zero = svg.querySelector("#zero");

    if (handboy) handboy.style.animation = "swing 1.3s ease-in-out infinite alternate";
    if (girllight) girllight.style.animation = "swing 1.3s ease-in-out infinite alternate";
    if (hairgirl) hairgirl.style.animation = "swinghair 1.3s ease-in-out infinite alternate";
    if (zero) zero.style.animation = "bounce 2s ease-in-out infinite";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4" 
         style={{
           background: "radial-gradient(at 50% -20%, #908392, #0d060e) fixed"
         }}>
      <style>{`
        @keyframes swing {
          0% { transform: rotate(10deg); }
          100% { transform: rotate(-10deg); }
        }
        @keyframes swinghair {
          0% { transform: rotate(6deg); }
          100% { transform: rotate(-6deg); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        #handboy {
          transform-origin: 98% 98%;
          transform-box: fill-box;
        }
        #girllight {
          transform-origin: 0% 97%;
          transform-box: fill-box;
        }
        #hairgirl {
          transform-origin: 60% 0%;
          transform-box: fill-box;
        }
        #zero {
          transform-origin: bottom;
          transform-box: fill-box;
        }
      `}</style>
      
      <div className="w-full max-w-4xl">
        <a href="/" className="block hover:opacity-90 transition-opacity">
          <svg ref={svgRef} width="100%" height="auto" viewBox="0 0 636 324" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="OBJECTS">
              <g id="Group">
                <path id="Vector" d="M101.3 255.2C101.3 255.2 111.1 272.6 181.8 280.5C252.5 288.4 288.2 314.9 333.1 322.8C378 330.7 433.6 278.5 481.8 286.5C530 294.4 588.2 264.2 592.8 255.2H101.3Z" fill="#2F1829"/>
                <path id="Vector_2" d="M611.9 251.7H601.4L140.8 251.8C140.8 251.8 136.1 248.1 128.9 241.8C125.8 239.1 122.2 235.9 118.3 232.3C116.9 231 115.4 229.6 113.9 228.2C100.2 215.3 83.6 198.2 70.1 180.1C55.9 161 45.1 140.6 44.8 122.6C44.8 122.2 44.8 121.8 44.8 121.4C45 104 48.4 85.1 56.9 67.7C61.9 57.5 68.5 47.8 77.3 39C100.1 16.2 137.1 0.300011 194.5 0.800011C261.4 1.30001 330.8 26.3 393.5 60.8C406.6 68 419.4 75.7 431.9 83.6C441.1 89.5 450.1 95.5 458.8 101.6C483.1 118.6 505.6 136.4 525.5 153.8C570.6 193.1 602.3 230.4 611.9 251.7Z" fill="url(#paint0_linear)"/>
                <path id="Vector_3" opacity="0.45" d="M611.9 251.7H601.4L140.8 251.8C140.8 251.8 136.1 248.1 128.9 241.8C125.8 239.1 122.2 235.9 118.3 232.3C116.9 231 115.4 229.6 113.9 228.2C100.2 215.3 83.6 198.2 70.1 180.1C55.9 161 45.1 140.6 44.8 122.6C50.5 119.6 63.9 113.5 75 116.3C89.5 119.9 92.6 137.2 92.6 137.2C92.6 137.2 103 128.8 113.9 132.8C124.8 136.8 126.5 148.4 126.5 148.4C126.5 148.4 139.4 141.8 150.9 144.6C162.5 147.4 171.8 158.6 159.4 165.9C147.1 173.1 133.3 167.5 132.9 167.4C133.1 167.6 137.9 174.2 129.1 182.2C120.1 190.4 154.6 197.5 154.6 197.5C154.6 197.5 155.9 175.1 179 177.6C202.1 180.1 220.8 192.6 220.8 192.6C220.8 192.6 222 158.3 240.5 152C259 145.7 268.5 165.9 268.5 165.9C268.5 165.9 309.5 139.4 323.4 164.1C337.3 188.8 337.9 193.5 337.9 193.5C337.9 193.5 349.8 128.5 387 131.5C424.2 134.5 431.1 160.3 430.5 162.9C429.9 165.5 441.2 146.2 452.4 156.7C463.6 167.2 470.1 181.8 470.1 181.8L529 174.9C529 174.9 523 163.3 525.4 153.8C570.6 193.1 602.3 230.4 611.9 251.7Z" fill="url(#paint1_linear)"/>
                <path id="Vector_6" d="M631.8 258.5H75.5C73.6 258.5 72.1 257 72.1 255.1C72.1 253.2 73.6 251.7 75.5 251.7H631.8C633.7 251.7 635.2 253.2 635.2 255.1C635.2 257 633.7 258.5 631.8 258.5Z" fill="#2F1829"/>
              </g>
              
              <g id="Group_7">
                <path d="M237.3 191.1V97.5H201.8V97.8L159 166.6L140.3 196.7L142.4 218.4H201.8V251H237.3V218.4H253V191H237.3V191.1ZM201.8 191.1H174.2L199.6 147.4L201.8 143.8V191.1Z" fill="url(#paint6_linear)"/>
                <path d="M487.5 191.1V97.5H452V97.8L390.5 196.7L392.6 218.4H452V251H487.5V218.4H503.1V191H487.5V191.1ZM452 191.1H424.4L449.8 147.4L452 143.8V191.1V191.1Z" fill="url(#paint8_linear)"/>
              </g>
              
              <g id="zero">
                <path d="M361.2 110.3C351.9 99 338.7 93.3 321.6 93.3C304.6 93.3 291.4 98.9 282.1 110.2C272.8 121.5 268.1 137.4 268.1 158.2V186.3C268.1 206.9 272.8 222.9 282.1 234.2C291.5 245.5 304.7 251.2 321.8 251.2C338.7 251.2 351.9 245.6 361.2 234.3C370.5 223 375.2 207.1 375.2 186.3V158.3C375.2 137.6 370.5 121.6 361.2 110.3ZM303.8 151.3C304 141 305.5 133.4 308.3 128.3C311.1 123.2 315.5 120.7 321.6 120.7C327.9 120.7 332.4 123.4 335.3 128.9C338.2 134.4 339.6 142.6 339.6 153.6V191.6C339.5 202.6 338.1 210.7 335.2 215.9C332.3 221.1 327.8 223.7 321.8 223.7C315.5 223.7 311 221 308.1 215.7C305.4 210.7 303.9 202.9 303.8 192.5C303.8 191.9 303.8 191.2 303.8 190.6V151.3V151.3Z" fill="url(#paint7_linear)"/>
              </g>
              
              <g id="handboy">
                <path d="M529.1 188C529.1 188 529.2 188.3 528.8 188.7C528.5 189 528 189.3 527.1 189.7C521.7 191.8 510.6 186.7 504.5 183.3C498.5 179.9 481.3 182.7 469.7 181.1C458.1 179.5 453.2 173.3 442.8 170.7C432.4 168.1 393.6 179.3 391.4 170.6C389.2 161.9 432.8 77.2 436.6 83.1C440.3 89 453.2 89.4 462.3 94.1C471.4 98.8 479.1 122.1 489.2 124.4C490.6 124.7 491.9 125.2 493.2 125.9C501.2 130.2 507 140.9 507.2 149.7C507.4 159.9 521.4 168.1 526.5 173.6C531.5 179.2 529.1 188 529.1 188Z" fill="url(#paint11_linear)"/>
              </g>
              
              <g id="girllight">
                <path d="M121.8 188C121.8 188 119.4 179.3 124.5 173.8C129.6 168.3 143.5 160.1 143.8 149.9C144.1 139.7 151.7 126.9 161.8 124.5C171.9 122.2 179.6 98.8 188.7 94.2C197.8 89.5 210.7 89.1 214.4 83.2C218.1 77.3 261.7 162 259.6 170.7C257.4 179.4 218.6 168.2 208.2 170.8C197.8 173.4 192.9 179.6 181.3 181.2C169.7 182.8 152.5 180 146.5 183.4C140.5 186.8 129.4 191.8 123.9 189.8C121.6 188.8 121.8 188 121.8 188Z" fill="url(#paint17_linear)"/>
              </g>
              
              <g id="hairgirl">
                <path d="M89.6 161.6C89.6 161.6 88.8 159.9 86.1 160.4C83.5 160.9 82.3 164.3 83.5 169.8C83.5 164.9 84.2 163.8 84.2 163.8C84.2 163.8 83.1 166.8 84.5 173.5C85.9 180.2 86.8 186.7 83.2 189.5C90.3 185.5 90.8 180.7 90.3 174.9C90 169.1 91.3 164 89.6 161.6Z" fill="#2F1829"/>
              </g>
            </g>
            
            <defs>
              <linearGradient id="paint0_linear" x1="327.54" y1="250.471" x2="330.184" y2="46.9149" gradientUnits="userSpaceOnUse">
                <stop stopColor="#E8D197"/>
                <stop offset="1" stopColor="#FEF5DA"/>
              </linearGradient>
              <linearGradient id="paint1_linear" x1="326.925" y1="147.902" x2="330.395" y2="242.079" gradientUnits="userSpaceOnUse">
                <stop/>
                <stop offset="1" stopOpacity="0"/>
              </linearGradient>
              <linearGradient id="paint6_linear" x1="197.311" y1="242.736" x2="195.989" y2="148.447" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2F1829"/>
                <stop offset="1" stopColor="#3B223C"/>
              </linearGradient>
              <linearGradient id="paint7_linear" x1="322.636" y1="240.979" x2="321.314" y2="146.691" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2F1829"/>
                <stop offset="1" stopColor="#3B223C"/>
              </linearGradient>
              <linearGradient id="paint8_linear" x1="447.456" y1="239.229" x2="446.134" y2="144.941" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2F1829"/>
                <stop offset="1" stopColor="#3B223C"/>
              </linearGradient>
              <linearGradient id="paint11_linear" x1="575.336" y1="236.543" x2="417.383" y2="126.175" gradientUnits="userSpaceOnUse">
                <stop stopColor="white"/>
                <stop offset="1" stopColor="white" stopOpacity="0"/>
              </linearGradient>
              <linearGradient id="paint17_linear" x1="75.5473" y1="236.543" x2="233.501" y2="126.174" gradientUnits="userSpaceOnUse">
                <stop stopColor="white"/>
                <stop offset="1" stopColor="white" stopOpacity="0"/>
              </linearGradient>
            </defs>
          </svg>
        </a>
        
        <div className="text-center mt-8">
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">Page Not Found</h2>
          <p className="text-gray-300 mb-6">The page you're looking for doesn't exist.</p>
          <a 
            href="/"
            className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}