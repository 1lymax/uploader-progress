import {
    Box,
    Checkbox,
    Collapse,
    Divider,
    FormControlLabel,
    LinearProgress,
    LinearProgressProps,
    Typography
} from "@mui/material";
import React, {FC, Key, useState} from 'react';
import DoneIcon from '@mui/icons-material/Done';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


export interface IUploadProgress {
    uploadProgress: File[]
}

export interface File {
    file: String;
    progress: number;
}


const UploaderProgress: FC <IUploadProgress> = ({uploadProgress}) => {
    const [show, setShow] = useState(false);
    const [hideCompleted, setHideCompleted] = useState(false);

    const getTotal = () => {
        return uploadProgress.length
    };

    const getWorking = () => {
        return uploadProgress.length - uploadProgress.filter(i => i.progress !== 100).length
    };

    const showItem = (item: File) => {
        if (!hideCompleted) return true
        if (hideCompleted && item.progress === 100) return false
        return true
    };

    const LinearProgressWithLabel = (props: LinearProgressProps & { value: number }) => {
        return (
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Box sx={{width: '100%', mr: 1}}>
                    <LinearProgress variant="determinate" {...props} />
                </Box>
                <Box sx={{minWidth: 35}}>
                    <Typography variant="body2" color="text.secondary">{`${Math.round(
                        props.value,
                    )}%`}</Typography>
                </Box>
            </Box>
        );
    }

    return (
        <Box sx={{
            border: '1px solid',
            borderColor: theme => theme.palette.grey[400],
            backgroundColor: 'white',
            borderRadius: '15px 15px 0px 0px',
            boxShadow: theme => theme.shadows[4],
            width: '300px',
            minHeight: '30px',
            maxWidth: '300px',
            position: 'fixed',
            bottom: 0,
            p: 1,
            right: 10,
            zIndex: 1
        }}
        >
            <Box onClick={() => setShow(!show)}
                 sx={{
                     display: 'flex',
                     cursor: 'pointer'
                 }}>
                {show
                    ?
                    <KeyboardArrowDownIcon color="action"/>
                    :
                    <KeyboardArrowUpIcon color="action"/>
                }
                <Box sx={{mx: 1}}>
                    <Typography variant='subtitle1'>
                        Upload progress ({getWorking()}/{getTotal()})
                    </Typography>
                </Box>
            </Box>
            <Box hidden={!show} sx={{ml: 3}}>
                <FormControlLabel
                    control={
                        <Checkbox checked={hideCompleted}
                                  onClick={() => setHideCompleted(!hideCompleted)}
                                  sx={{'& .MuiSvgIcon-root': {fontSize: 16}, ml: 2}}
                        />
                    } label="Hide completed"/>
            </Box>
            <Divider sx={{mb: 1, mt: 2}}/>

            <Collapse in={show}>
                <Box
                    sx={{
                        minHeight: '20px',
                        maxHeight: '300px',
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        width: '100%'
                    }}>

                    {uploadProgress.map(file => showItem(file) &&
						<Box key={file.file as Key}>
							<Box
								sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    height: '40px',
                                    width: '100%'
                                }}
							>
                                {file.progress === 100 &&
									<DoneIcon color="success" sx={{mr: 1}}/>
                                }
								<Typography variant='body2'>
                                    {file.file}
								</Typography>

							</Box>
							<Box sx={{width: '100%'}}>
								<LinearProgressWithLabel value={file.progress < 100 ? file.progress : 100}/>
							</Box>
							<Divider variant='middle' sx={{mt: 1, mb: 1}}/>
                        </Box>
                    )}
                </Box>
            </Collapse>

        </Box>
    );
};

export default UploaderProgress;