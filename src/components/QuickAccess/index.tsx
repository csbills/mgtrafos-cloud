import { Container, FileCard, Title } from './styles';

import xlsSVG from '../../assets/xls.svg';
import pdfSVG from '../../assets/pdf.svg';
import jpgSVG from '../../assets/jpg.svg';
import docSVG from '../../assets/doc.svg';
import folderSVG from '../../assets/folder.svg';

export function QuickAccess() {
    return (
        <>
            <Title>Recent</Title>

            <Container>
                <FileCard>
                    <img src={folderSVG} alt="" />
                    <span>Product Design</span>
                </FileCard>

                <FileCard>
                    <img src={jpgSVG} alt="" />
                    <span>Wireframes.jpg</span>
                </FileCard>

                <FileCard>
                    <img src={xlsSVG} alt="xls" />
                    <span>AnnualReport.xls</span>
                </FileCard>

                <FileCard>
                    <img src={pdfSVG} alt="" />
                    <span>SiteMap.pdf</span>
                </FileCard>

                <FileCard>
                    <img src={docSVG} alt="" />
                    <span>Document.docx</span>
                </FileCard>

                <FileCard>
                    <img src={docSVG} alt="" />
                    <span>Document.docx</span>
                </FileCard>                
            </Container>
        </>

    )
}