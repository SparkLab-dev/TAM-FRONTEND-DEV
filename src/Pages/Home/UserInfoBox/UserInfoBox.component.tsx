import { FC } from 'react';

import {
    Box,
    Content,
    DetailRow,
    Label,
    LabelValue
} from './style/UserInfoBox.style';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';


const USER_DUMMY_DATA = {
    name: 'Antonio',
    surname: 'Banderas',
    numberOfPropertiesLoaded: 23
}; // to do set the real user data

const UserInfoBox: FC<{}> = () => {



    const name=useSelector( (state: RootState) => state.auth.user?.firstName)
    const surname=useSelector( (state: RootState) => state.auth.user?.lastName)
    const role=useSelector( (state: RootState) => state.auth.user?.role)
    return (
        <Box>
            
            <Content>
                <DetailRow>
                    <Label>Name</Label>

                    <LabelValue>{name}</LabelValue>
                </DetailRow>

                <DetailRow>
                    <Label>Surname</Label>

                    <LabelValue>{surname}</LabelValue>
                </DetailRow>

                <DetailRow>
                    <Label>Role</Label>

                    <LabelValue>{role}</LabelValue>
                </DetailRow>
            </Content>
        </Box>
    );
};

export default UserInfoBox;
