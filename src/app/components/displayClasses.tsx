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
            classList.push(
                <React.Fragment key={uuidv4()}>
                    <Flex key={uuidv4()} gap={0}>
                        {language.language === 'English Patch' && <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Hu.png`} alt='Hunter' title='Hunter' w={16} h={16} />}
                        {language.language === 'Global' && <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Hu.png`} alt='Hunter' title='Hunter' w={16} h={16} />}
                        {language.language === '日本語' && <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Hu.png`} alt='ハンター' title='ハンター' w={16} h={16} />}
                        {language.language === 'English Patch' && <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Ra.png`} alt='Ranger' title='Ranger' w={16} h={16} />}
                        {language.language === 'Global' && <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Ra.png`} alt='Ranger' title='Ranger' w={16} h={16} />}
                        {language.language === '日本語' && <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Ra.png`} alt='レンジャー' title='レンジャー' w={16} h={16} />}
                        {language.language === 'English Patch' && <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Fo.png`} alt='Force' title='Force' w={16} h={16} />}
                        {language.language === 'Global' && <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Fo.png`} alt='Force' title='Force' w={16} h={16} />}
                        {language.language === '日本語' && <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Fo.png`} alt='フォース' title='フォース' w={16} h={16} />}
                    </Flex>
                    <Flex key={uuidv4()} gap={0}>
                        {language.language === 'English Patch' && <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Fi.png`} alt='Fighter' title='Fighter' w={16} h={16} />}
                        {language.language === 'Global' && <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Fi.png`} alt='Fighter' title='Fighter' w={16} h={16} />}
                        {language.language === '日本語' && <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Fi.png`} alt='ファイター' title='ファイター' w={16} h={16} />}
                        {language.language === 'English Patch' && <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Ra.png`} alt='Gunner' title='Gunner' w={16} h={16} />}
                        {language.language === 'Global' && <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Ra.png`} alt='Gunner' title='Gunner' w={16} h={16} />}
                        {language.language === '日本語' && <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Ra.png`} alt='ガンナー' title='ガンナー' w={16} h={16} />}
                        {language.language === 'English Patch' && <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Te.png`} alt='Techer' title='Techer' w={16} h={16} />}
                        {language.language === 'Global' && <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Te.png`} alt='Techter' title='Techter' w={16} h={16} />}
                        {language.language === '日本語' && <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Te.png`} alt='テクター' title='テクター' w={16} h={16} />}
                    </Flex>
                    <Flex key={uuidv4()} gap={0}>
                        {language.language === 'English Patch' && <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Br.png`} alt='Braver' title='Braver' w={16} h={16} />}
                        {language.language === 'Global' && <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Br.png`} alt='Braver' title='Braver' w={16} h={16} />}
                        {language.language === '日本語' && <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Br.png`} alt='ブレイバー' title='ブレイバー' w={16} h={16} />}
                        {language.language === 'English Patch' && <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Ra.png`} alt='Bouncer' title='Bouncer' w={16} h={16} />}
                        {language.language === 'Global' && <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Ra.png`} alt='Bouncer' title='Bouncer' w={16} h={16} />}
                        {language.language === '日本語' && <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Ra.png`} alt='バウンサー' title='バウンサー' w={16} h={16} />}
                        {language.language === 'English Patch' && <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Su.png`} alt='Summoner' title='Summoner' w={16} h={16} />}
                        {language.language === 'Global' && <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Su.png`} alt='Summoner' title='Summoner' w={16} h={16} />}
                        {language.language === '日本語' && <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Su.png`} alt='サモナー' title='サモナー' w={16} h={16} />}
                    </Flex>
                    <Flex key={uuidv4()} gap={0}>
                    {language.language === 'English Patch' && <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Hr.png`} alt='Hero' title='Hero' w={16} h={16} />}
                        {language.language === 'Global' && <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Hr.png`} alt='Hero' title='Hero' w={16} h={16} />}
                        {language.language === '日本語' && <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Hr.png`} alt='ヒーロー' title='ヒーロー' w={16} h={16} />}
                        {language.language === 'English Patch' && <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Ra.png`} alt='Phantom' title='Phantom' w={16} h={16} />}
                        {language.language === 'Global' && <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Ra.png`} alt='Phantom' title='Phantom' w={16} h={16} />}
                        {language.language === '日本語' && <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Ra.png`} alt='ファントム' title='ファントム' w={16} h={16} />}
                        {language.language === 'English Patch' && <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Et.png`} alt='Etoile' title='Etoile' w={16} h={16} />}
                        {language.language === 'Global' && <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Et.png`} alt='Étoile' title='Étoile' w={16} h={16} />}
                        {language.language === '日本語' && <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Et.png`} alt='エトワール' title='エトワール' w={16} h={16} />}
                        {language.language === 'English Patch' && <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Lu.png`} alt='Luster' title='Luster' w={16} h={16} />}
                        {language.language === 'Global' && <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Lu.png`} alt='Luster' title='Luster' w={16} h={16} />}
                        {language.language === '日本語' && <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Lu.png`} alt='ラスター' title='ラスター' w={16} h={16} />}
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
                let className: string = ''
                switch (language.language) {
                    case 'English Patch':
                        className = loc['Name (English)'];
                        break;
                    case 'Global':
                        className = loc['Name (Global)'];
                        break;
                    case '日本語':
                        className = loc['Name (JP)'];
                        break;
                }
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