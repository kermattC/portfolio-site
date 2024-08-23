import './../styles/projectCard.css';
import SkillsNugget from './skillsNugget';
import { useState } from 'react';
import Modal from './modal';

interface ProjectCardProps {
    title: string,
    description: string,
    timeline: string,
    thumbnail: string,
    link: string,
    skills: string[],
    type: string
}

const images: { [key:string]: string} = {
    'mscThumbnail': require('./../figures/msc-thumbnail.png'),
    'bscThumbnail': require('./../figures/bc-thumbnail.png'),
    'perntodoThumbnail': require('./../figures/perntodo-thumbnail.png'),
    'gooseThumbnail': require('./../figures/goose-thumbnail.png'),
    'baseballThumbnail': require('./../figures/baseball-stats-thumbnail.png'),
}

const ProjectCard = ( { title, description, timeline, thumbnail, link, skills, type}: ProjectCardProps ) => {

    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const pcThumbnail = images[thumbnail]

    function cardEnter(event: React.MouseEvent<HTMLDivElement>) {
        setIsHovered(true);
    }

    function cardLeave(event: React.MouseEvent<HTMLDivElement>) {
        console.log("Leaving: ", event)
        setIsHovered(false);
    }

    function openModal(): void {
        if (type === 'thesis') {
            setIsModalOpen(true);
        } else {
            openInNewTab()
        }
    }

    // function closeModal(): void {
    //     setIsOpenModal(false);
    // }

    function openInNewTab(): void {
        // console.log("")
        window.open(link, "_blnk", "noreferrer");
    }

    return (
        // <div className='projectContainer' onClick={() => openInNewTab()}>
        
        <>
            <div className='projectContainer'  onClick={openModal}>
                <div className={isHovered ? 'projectCard-hovered' : 'projectCard'} 
                    onMouseEnter={(e) => cardEnter(e)} 
                    onMouseLeave={(e) => cardLeave(e)}
                >
                    <div className='detailsContainer'>
                        <div className='left-details'>
                            <h2>{title}</h2>
                            <p>{description}</p>    
                        </div>
                        <div className='right-details'>
                            <p className='projectTimeline'>{timeline}</p>
                            {pcThumbnail ? <img className='thumbnail' src={pcThumbnail} alt={`${thumbnail} fig`} /> : null}
                        </div>
                    </div>
                    <div className='skillsContainer'>
                        <SkillsNugget skills={skills}/>
                    </div>
                </div>
            </div>
            { isModalOpen ? 
                <Modal modalToggle={setIsModalOpen} openLink={openInNewTab}/>
                : 
                null
            }
    </>
    )
}

export default ProjectCard;

