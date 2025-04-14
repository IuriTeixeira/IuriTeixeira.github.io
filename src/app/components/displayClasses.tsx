import React from 'react';
import { Flex, Image } from '@mantine/core';
import localization from "../localization.json"
import { useLanguageContext } from '../language-provider';

interface DisplayClassesProps{
    classes: string[];
    id?: number
}

export default function DisplayClasses({classes,id}: DisplayClassesProps): any {
    const language = useLanguageContext()
    let classList: any[] = []
    if(!id) id = 0
    if (classes) {
        if (classes[0] === 'All') {
            let classNames: string[] = []
            switch (language.language) {
                case 'Global': classNames = ["Hunter", "Ranger", "Force", "Fighter", "Gunner", "Techer", "Braver", "Bouncer", "Summoner", "Hero", "Phantom", "Etoile", "Luster"]; break;
                case 'JP': classNames = ["Hunter", "Ranger", "Force", "Fighter", "Gunner", "Techter", "Braver", "Bouncer", "Summoner", "Hero", "Phantom", "Étoile", "Luster"]; break;
                default: classNames = ["ハンター", "レンジャー", "フォース", "ファイター", "ガンナー", "テクター", "ブレイバー", "バウンサー", "サモナー", "ヒーロー", "ファントム", "エトワール", "ラスター"]
            }
            classList.push(
                <React.Fragment key={`class-fragment-${id}`}>
                    <Flex key={`class-flex-1-${id}`} gap={0}>
                        <Image fallbackSrc='/Blank.png' key={`class-hu-${id}`} src={`/icons/Hu.png`} alt={classNames[0]} title={classNames[0]} w={16} h={16} />
                        <Image fallbackSrc='/Blank.png' key={`class-ra-${id}`} src={`/icons/Ra.png`} alt={classNames[1]} title={classNames[1]} w={16} h={16} />
                        <Image fallbackSrc='/Blank.png' key={`class-fo-${id}`} src={`/icons/Fo.png`} alt={classNames[2]} title={classNames[2]} w={16} h={16} />
                    </Flex>
                    <Flex key={`class-flex-2-${id}`} gap={0}>
                        <Image fallbackSrc='/Blank.png' key={`class-fi-${id}`} src={`/icons/Fi.png`} alt={classNames[3]} title={classNames[3]} w={16} h={16} />
                        <Image fallbackSrc='/Blank.png' key={`class-gu-${id}`} src={`/icons/Gu.png`} alt={classNames[4]} title={classNames[4]} w={16} h={16} />
                        <Image fallbackSrc='/Blank.png' key={`class-te-${id}`} src={`/icons/Te.png`} alt={classNames[5]} title={classNames[5]} w={16} h={16} />
                    </Flex>
                    <Flex key={`class-flex-3-${id}`} gap={0}>
                        <Image fallbackSrc='/Blank.png' key={`class-br-${id}`} src={`/icons/Br.png`} alt={classNames[6]} title={classNames[6]} w={16} h={16} />
                        <Image fallbackSrc='/Blank.png' key={`class-bo-${id}`} src={`/icons/Bo.png`} alt={classNames[7]} title={classNames[7]} w={16} h={16} />
                        <Image fallbackSrc='/Blank.png' key={`class-su-${id}`} src={`/icons/Su.png`} alt={classNames[8]} title={classNames[8]} w={16} h={16} />
                    </Flex>
                    <Flex key={`class-flex-4-${id}`} gap={0}>
                        <Image fallbackSrc='/Blank.png' key={`class-hr-${id}`} src={`/icons/Hr.png`} alt={classNames[9]} title={classNames[9]} w={16} h={16} />
                        <Image fallbackSrc='/Blank.png' key={`class-ph-${id}`} src={`/icons/Ph.png`} alt={classNames[10]} title={classNames[10]} w={16} h={16} />
                        <Image fallbackSrc='/Blank.png' key={`class-et-${id}`} src={`/icons/Et.png`} alt={classNames[11]} title={classNames[11]} w={16} h={16} />
                        <Image fallbackSrc='/Blank.png' key={`class-lu-${id}`} src={`/icons/Lu.png`} alt={classNames[12]} title={classNames[12]} w={16} h={16} />
                    </Flex>
                </React.Fragment>
            )
        } else {
            let loc: any
            let classListAux: any[] = []
            let listBreak: number = 1;
            for (let i = 0; i < classes.length; i++) {
                loc = localization.find(name => name['Abbreviation'] === classes[i])
                let currentClass: any = null
                let className: string = loc[`Name (${language.language})`];
                currentClass = <Image fallbackSrc='/Blank.png' key={`class-${classes[i]}-${id}`} src={`/icons/${classes[i]}.png`} alt={className} title={className} w={16} h={16} />
                classListAux.push(currentClass)
                switch (classes.length) {
                    case 4:
                        listBreak = 2;
                        break;
                    default:
                        listBreak = 3;
                }
                if (classListAux.length % listBreak === 0 || !classes[i + 1]) {
                    classList.push(<Flex key={`class-flex-${classes[i]}-${id}`} gap={0}>{classListAux}</Flex>)
                    classListAux = []
                }
            }
        }
        return classList
    } else { return null }
}