import { Header } from '../Header';
import { Container } from './styles';
import { QuickAccess } from '../../components/QuickAccess';
import { FilesList } from '../../components/FilesList';

export function Content() {
    return (
        <Container>
            <Header />
            <QuickAccess />
            <FilesList />               
        </Container>
    )
}