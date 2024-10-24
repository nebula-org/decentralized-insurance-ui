import { Radio } from 'antd';

const BinaryQuestion = (props) => {
    const { question, handleAnswer, answer, defaultValue } = props


    const onChange = (e) => {

        if (handleAnswer) {
            handleAnswer(e.target.value)
        }
    }
    return (
        <div className='NB-binary'>
            <h2 style={{ textAlign: 'left' }}>{question}</h2>
            <div style={{ width: '100%', display: 'flex' }}>
                <Radio.Group size='large' buttonStyle='outline' onChange={onChange} defaultValue={defaultValue} value={answer}>
                    <Radio.Button
                        style={{ marginRight: '1rem', borderRadius: 0, width: '10rem' }}
                        value="yes">Yes</Radio.Button>
                    <Radio.Button
                        style={{ marginRight: '1rem', borderRadius: 0, width: '10rem' }}
                        value="no">No</Radio.Button>

                </Radio.Group>
            </div>
        </div>
    )
}

export default BinaryQuestion