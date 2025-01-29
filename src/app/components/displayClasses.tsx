import React from 'react';
import { useLanguageContext } from "../language-provider";
import { Flex, Image } from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';
import localization from "../localization.json"

export default function displayClasses(classes: any[]): any {
    const language = useLanguageContext()
    let classList: any[] = []
    if (classes) {
        if (classes[0] === 'All') {
            let classNames: string[] = []
            switch (language.language) {
                case 'Global': classNames = ["Hunter", "Ranger", "Force", "Fighter", "Gunner", "Techer", "Braver", "Bouncer", "Summoner", "Hero", "Phantom", "Etoile", "Luster"]; break;
                case 'JP': classNames = ["Hunter", "Ranger", "Force", "Fighter", "Gunner", "Techter", "Braver", "Bouncer", "Summoner", "Hero", "Phantom", "Étoile", "Luster"]; break;
                default: classNames = ["ハンター", "レンジャー", "フォース", "ファイター", "ガンナー", "テクター", "ブレイバー", "バウンサー", "サモナー", "ヒーロー", "ファントム", "エトワール", "ラスター"]
            }
            classList.push(
                <React.Fragment key={uuidv4()}>
                    <Flex key={uuidv4()} gap={0}>
                        <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Hu.png`} alt={classNames[0]} title={classNames[0]} w={16} h={16} />
                        <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Ra.png`} alt={classNames[1]} title={classNames[1]} w={16} h={16} />
                        <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Fo.png`} alt={classNames[2]} title={classNames[2]} w={16} h={16} />
                    </Flex>
                    <Flex key={uuidv4()} gap={0}>
                        <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Fi.png`} alt={classNames[3]} title={classNames[3]} w={16} h={16} />
                        <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Gu.png`} alt={classNames[4]} title={classNames[4]} w={16} h={16} />
                        <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Te.png`} alt={classNames[5]} title={classNames[5]} w={16} h={16} />
                    </Flex>
                    <Flex key={uuidv4()} gap={0}>
                        <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Br.png`} alt={classNames[6]} title={classNames[6]} w={16} h={16} />
                        <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Bo.png`} alt={classNames[7]} title={classNames[7]} w={16} h={16} />
                        <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Su.png`} alt={classNames[8]} title={classNames[8]} w={16} h={16} />
                    </Flex>
                    <Flex key={uuidv4()} gap={0}>
                        <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Hr.png`} alt={classNames[9]} title={classNames[9]} w={16} h={16} />
                        <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Ph.png`} alt={classNames[10]} title={classNames[10]} w={16} h={16} />
                        <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Et.png`} alt={classNames[11]} title={classNames[11]} w={16} h={16} />
                        <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Lu.png`} alt={classNames[12]} title={classNames[12]} w={16} h={16} />
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
                currentClass = <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/${classes[i]}.png`} alt={className} title={className} w={16} h={16} />
                classListAux.push(currentClass)
                switch (classes.length) {
                    case 4:
                        listBreak = 2;
                        break;
                    default:
                        listBreak = 3;
                }
                if (classListAux.length % listBreak === 0 || !classes[i + 1]) {
                    classList.push(<Flex key={uuidv4()} gap={0}>{classListAux}</Flex>)
                    classListAux = []
                }
            }
        }
        return classList
    } else { return null }
}