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
import { useTranslation } from 'react-i18next';



const USER_DUMMY_DATA = {
    name: 'Antonio',
    surname: 'Banderas',
    numberOfPropertiesLoaded: 23
}; // to do set the real user data

const UserInfoBox: FC<{}> = () => {



    const name=useSelector( (state: RootState) => state.auth.user?.firstName)
    const surname=useSelector( (state: RootState) => state.auth.user?.lastName)
    const role=useSelector( (state: RootState) => state.auth.user?.role)
    const { t } = useTranslation();
    return (
        <Box>
            
            <Content>
                <DetailRow>
                    <Label>{t("name")}</Label>

                    <LabelValue>{name}</LabelValue>
                </DetailRow>

                <DetailRow>
                    <Label>{t("surname")}</Label>

                    <LabelValue>{surname}</LabelValue>
                </DetailRow>

                <DetailRow>
                    <Label>{t("role")}</Label>

                    <LabelValue>{role}</LabelValue>
                </DetailRow>
            </Content>
        </Box>
    );
};

export default UserInfoBox;
