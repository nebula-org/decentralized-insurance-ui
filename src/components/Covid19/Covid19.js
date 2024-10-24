
import { DatePicker } from 'antd';
import BinaryQuestion from '../BinaryQuestion/BinaryQuestion';

import "./Covid19.css"
import dayjs from 'dayjs';

const Covid19 = ({ handleCovid19, covid19 }) => {

    const onChange = (key, date, dateString) => {
        console.log("date", date, dateString, key)
        handleCovid19(key, dateString)
    };

    return (
        <div className='NB-Covid19'>
            <BinaryQuestion
                question={"Have you been tested positive for Covid 19?"}
                answer={covid19.isPositive}
                defaultValue="no"
                handleAnswer={(answer) => handleCovid19('isPositive', answer)}

            />
            {covid19.isPositive === "yes" ? (
                <>
                    <BinaryQuestion
                        question={"Are you fully recovered?"}
                        answer={covid19.isRecovered}
                        defaultValue="no"
                        handleAnswer={(answer) => handleCovid19('isRecovered', answer)}

                    />

                    <div className='dates' style={{ display: 'flex' }}>
                        <div className='date__diagnosis'>
                            <h2 style={{ textAlign: 'left' }}>Date of Diagnosis</h2>

                            <DatePicker
                                value={dayjs(covid19.diagnosisDate, 'YYYY-MM-DD')}
                                onChange={(date, dateString) => onChange('diagnosisDate', date, dateString)} />
                        </div>
                        <div className='date__recovery'>

                            <h2 style={{ textAlign: 'left' }}>Date of Recovery</h2>
                            <DatePicker
                                value={dayjs(covid19.recoveryDate, 'YYYY-MM-DD')}
                                onChange={(date, dateString) => onChange('recoveryDate', date, dateString)} />
                        </div>
                    </div>

                    <BinaryQuestion
                        question={"Were you hospitalized for covid19 treatment?"}
                        answer={covid19.isHospitalized}
                        defaultValue="no"
                        handleAnswer={(answer) => handleCovid19('isHospitalized', answer)}

                    />
                </>
            ) : null}

        </div>
    )
}

export default Covid19