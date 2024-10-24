import React, { useContext, useEffect, useState } from 'react'
import { Steps, Col, Row } from 'antd';
import { basicInfoStepItems } from '../../utils/content.js'
import Gender from '../Gender/Gender.js';
import Age from '../Age/Age.js';
import Location from '../Location/Location.js';
import Occupation from '../Occupation/Occupation.js';
import MonthlyIncome from '../MonthlyIncome/MonthlyIncome.js';
import Education from '../Education/Education.js';
import { BasicDetailsContext } from '../../pages/Details/BasicDetails.js';
import "./BasicInfo.css"
import BinaryQuestion from '../BinaryQuestion/BinaryQuestion.js';
import Covid19 from '../Covid19/Covid19.js';
import Surgery from '../Surgery/Surgery.js';


const BasicInfo = () => {
  const { details, setDetails } = useContext(BasicDetailsContext);
  const [steps, setSteps] = useState(() => {
    return basicInfoStepItems.map(step => step)
  })

  const [active, setActive] = useState(0)



  const handleCovid19 = (key, value) => {
    setDetails({ ...details, healthInfo: { ...details.healthInfo, covid19: { ...details.healthInfo.covid19, [key]: value } } })
  }

  const handleNarcotics = (value) => {
    setDetails({ ...details, healthInfo: { ...details.healthInfo, narcotics: value } })
  }

  const handleDiabetes = (value) => {
    setDetails({ ...details, healthInfo: { ...details.healthInfo, diabetes: value } })
  }

  const handleArmed = (value) => {
    setDetails({ ...details, healthInfo: { ...details.healthInfo, armed: value } })
  }

  const handleResidency = (value) => {
    setDetails({ ...details, healthInfo: { ...details.healthInfo, residency: value } })
  }




  const renderContent = () => {
    switch (active + 1) {
      case 1:
        return <Covid19 handleCovid19={handleCovid19} covid19={details.healthInfo.covid19} />

      case 2:
        return <Surgery />
      case 3:
        return <BinaryQuestion
          question={"Have you ever consumed narcotics?"}
          answer={details.healthInfo.narcotics}
          defaultValue="no"
          handleAnswer={(answer) => handleNarcotics(answer)}

        />
      case 4:
        return <BinaryQuestion
          question={"Are you Diabetic?"}
          answer={details.healthInfo.diabetes}
          defaultValue="no"
          handleAnswer={(answer) => handleDiabetes(answer)}

        />
      case 5:
        return <BinaryQuestion
          question={"Are you employed in the armed?"}
          answer={details.healthInfo.armed}
          defaultValue="no"
          handleAnswer={(answer) => handleArmed(answer)}

        />

      case 6:
        return <BinaryQuestion
          question={"Are you currently residing outside India?"}
          answer={details.healthInfo.residency}
          defaultValue="no"
          handleAnswer={(answer) => handleResidency(answer)}

        />


      default: return <></>
    }
  }

  const isCovid19Filled = () => {
    if (details.healthInfo.covid19.isPositive == "yes") {
      return ["isHospitalized",
        "recoveryDate", "diagnosisDate", "isHospitalized"].every(field => details.healthInfo.covid19[field])
    }
    return true
  }

  const isSurgeryFilled = () => {
    if (details.healthInfo.surgery.hadSurgery == "yes") {
      if (details.healthInfo.surgery.surgeryTypes.length == 0) return false
      else return true
    }
    return true
  }


  const handleStepChange = nextActiveStep => {
    if (active == 0) {
      if (isCovid19Filled()) {
        setActive(nextActiveStep)
      }
    } else if (active == 1) {
      if (isSurgeryFilled()) {
        setActive(nextActiveStep)
      }
    } else {
      setActive(nextActiveStep)
    }
  }
  return (
    <div className='NB-Basic-Info'>
      <Row align={"stretch"}>
        <Col span={9}>
          <div className='gradient-bg-outer'>
            <div className="NB-Basic-Info__nav gradient-bg">
              <Steps
                direction="vertical"
                onChange={(active) => handleStepChange(active)}
                current={active}
                items={steps}
              />
            </div>
          </div>
        </Col>
        <Col span={15} align="start">
          <div className='NB-Basic-Info__content'>
            {renderContent()}
          </div>
        </Col>
      </Row>


    </div>
  )
}

export default BasicInfo