import profileImg from '../../assets/capturar.png';
import bellSVG from '../../assets/bell.svg';
import searchSVG from '../../assets/search.svg';
import downRight from '../../assets/down-arrow.svg';

import {
    Container,
    InputContainer,
    ProfileContainer,
    ProfileImage,
} from './styles';

export function Header() {
    return (
        <Container>
            <InputContainer>
                <img src={searchSVG} alt="search" />
                <input placeholder="Search Here" />
            </InputContainer>

            <ProfileContainer>
                <button>Enviar arquivo</button>
                <img src={bellSVG} alt="bell" width="24" height="24"/>
                <ProfileImage>
                    <img src={profileImg} alt="profile" />
                </ProfileImage>
                <img src={downRight} alt="downRight" width="12" height="12" />
            </ProfileContainer>
        </Container>
    )
}