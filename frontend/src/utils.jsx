export const IP = '127.0.0.1'
export const BASE_URL = `http://${IP}:8000`

export const mainGreen = "#227f19"
export const mainPink = "#76197f"
export const mainBlue = "#19557f"
export const mainOrange = "#7f4319"

export const buttonStyle1 = {
      backgroundColor: mainPink,
      color:"white",
      transition: 'opacity 0.3s ease',
}
export const buttonOnHover1 = (e) => {
      e.target.style.opacity = 0.7
      e.target.style.backgroundColor = mainGreen
}
export const buttonOffHover1 = (e) => {
      e.target.style.opacity = 1
      e.target.style.backgroundColor = mainPink
}

export const buttonStyle2 = {
      backgroundColor: mainOrange,
      transition: 'opacity 0.3s ease',
}
export const buttonOnHover2 = (e) => {
      e.target.style.opacity = 0.7
      e.target.style.backgroundColor = mainGreen
}
export const buttonOffHover2 = (e) => {
      e.target.style.opacity = 1
      e.target.style.backgroundColor = mainOrange
}


export const buttonStyle3 = {
      backgroundColor: mainGreen,
      transition: 'opacity 0.3s ease',
}
export const buttonOnHover3 = (e) => {
      e.target.style.opacity = 0.7
      e.target.style.backgroundColor = mainPink
}
export const buttonOffHover3 = (e) => {
      e.target.style.opacity = 1
      e.target.style.backgroundColor = mainGreen
}


export const genderMapping = {
      1: 'masculino',
      2: 'femenino',
      3: 'otro',
}

export const countryCodes = [
      { code: '+1', name: 'United States' },
      { code: '+51', name: 'Peru' },
      { code: '+52', name: 'Mexico' },
      { code: '+53', name: 'Cuba' },
      { code: '+54', name: 'Argentina' },
      { code: '+55', name: 'Brazil' },
      { code: '+56', name: 'Chile' },
      { code: '+57', name: 'Colombia' },
      { code: '+58', name: 'Venezuela' },
      { code: '+60', name: 'Malaysia' },
      { code: '+61', name: 'Australia' },
      { code: '+62', name: 'Indonesia' },
      { code: '+63', name: 'Philippines' },
      { code: '+64', name: 'New Zealand' },
      { code: '+65', name: 'Singapore' },
      { code: '+66', name: 'Thailand' },
      { code: '+81', name: 'Japan' },
      { code: '+82', name: 'South Korea' },
      { code: '+84', name: 'Vietnam' },
      { code: '+86', name: 'China' },
      { code: '+591', name: 'Bolivia' },
      { code: '+506', name: 'Costa Rica' },
      { code: '+593', name: 'Ecuador' },
      { code: '+503', name: 'El Salvador' },
      { code: '+33', name: 'France' },
      { code: '+49', name: 'Germany' },
      { code: '+30', name: 'Grece' },
      { code: '+502', name: 'Guatemala' },
      { code: '+504', name: 'Honduras' },
      { code: '+39', name: 'Italia' },
      { code: '+507', name: 'Panama' },
      { code: '+595', name: 'Paraguay' },
      { code: '+351', name: 'Portugal' },
      { code: '+7', name: 'Russia' },
      { code: '+966', name: 'Saudi Arabia' },
      { code: '+27', name: 'South Africa' },
      { code: '+34', name: 'España' },
      { code: '+598', name: 'Uruguay' }

]

export const cotizationTypes = [
      { id:1, name: 'granel'},
      { id:2, name: 'prensado'},
      { id:3, name: 'molido'},
      { id:4, name: 'paletizado'},
]

export const unitsOfMeasure = [
      { id:1, name: 'KG'},
      { id:2, name: 'TON'},
      { id:3, name: 'G'},
      { id:4, name: 'LB'},
      { id:5, name: 'L'},
      { id:6, name: 'ML'},
      { id:7, name: 'M3'},
      { id:8, name: 'CM3'},
      { id:9, name: 'EA'},
      { id:10, name: 'DOZ'},
      { id:11, name: 'M'},
      { id:12, name: 'CM'},
      { id:13, name: 'INCH'},
]