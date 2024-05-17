import  styles from './Feedback.module.scss'
import { Button, Card, CardActionArea, CardContent, Typography } from '@mui/material'
import FeedbackIcon from '@mui/icons-material/Feedback';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../utilities/constants';

const Feedback = () => {
const navigate=useNavigate()
    const handleFeedBackView=()=>{
        navigate(APP_ROUTES.CREATE_FEEDBACK)
    }

    const handleFaqView=()=>{
        navigate(APP_ROUTES.View_FAQ)
    }
  return (
    <section className={`${styles.container} content-padding container layout-row layout-wrap layout-align-center center`}>
    <div className={`${styles.dashboard}`}>
      <div className={`${styles.card_container}`}>
        <Card className={`${styles.dashboard_card}`}>
          <CardActionArea>
            <CardContent>
              <FeedbackIcon className={`${styles.icon}`}  />
              <Typography variant="h5">Feedback</Typography>
              <Typography variant="body2">View feedback</Typography>
            </CardContent>
            <Button className={`${styles.button}`} onClick={()=>{handleFeedBackView()}}>View</Button>
          </CardActionArea>
        </Card>
        <Card className={`${styles.dashboard_card}`}>
          <CardActionArea>
            <CardContent>
              <LiveHelpIcon className={`${styles.icon}`} />
              <Typography variant="h5">FAQ</Typography>
              <Typography variant="body2">View FAQ</Typography>
            </CardContent>
            <Button className={`${styles.button}`} 
            onClick={()=>{handleFaqView()}}>View</Button>
          </CardActionArea>
        </Card>
    
      </div>
    </div>
    </section>
  )
}

export default Feedback