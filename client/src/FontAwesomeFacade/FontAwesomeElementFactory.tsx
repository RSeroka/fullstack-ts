


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

// https://fontawesome.com/v6/docs/web/use-with/react/add-icons



export default class FontAwesomeIconElementFactory {

    private static _instance: FontAwesomeIconElementFactory | undefined = undefined;

    public static get instance(): FontAwesomeIconElementFactory {
        if (FontAwesomeIconElementFactory._instance === undefined) {
            FontAwesomeIconElementFactory._instance = new FontAwesomeIconElementFactory();
        }
        return FontAwesomeIconElementFactory._instance;
    }

    private icons:any = {};
    private constructor() {
        // dictionary below contains Font Awesome Icons that will be used 
        // in the application. 
        // the icon() macro uses babel macros to limit the glyphs imported 
        // into the product to only what is declared in the icon calls
        // Note: the icon() macro only works with static parameters, 
        // can not use variables, this is why the dictionary is needed .

        this.icons = {
            classic : {
                solid: {
                    'backward-fast': icon({name: 'backward-fast', style: 'solid', family: 'classic'}),
                    'backward-step': icon({name: 'backward-step', style: 'solid', family: 'classic'}),
                    'forward-step' : icon({name: 'forward-step', style: 'solid', family: 'classic'}),
                    'play': icon({name: 'play', style: 'solid', family: 'classic'}),
                    'snowflake': icon({name: 'snowflake', style: 'solid', family: 'classic'}),
                    'arrow-up-right-from-square': icon({name: "arrow-up-right-from-square", style: 'solid', family: 'classic'} )
                },
                regular: {
                    'snowflake': icon({name: 'snowflake', style: 'regular', family: 'classic'})
                }, 
                brands: {
                    'node': icon({name: 'node', style: 'brands', family: 'classic'})
                }                
            }
        }


    }

    public create(name: string, style?: string, family?: string, options?: {size?: string}) : JSX.Element | undefined {
        const style_ = style ? style: 'solid';
        const family_ = family ? family : 'classic';
        const faIcon = this.icons[family_]?.[style_]?.[name];
        if (faIcon) {
            return <FontAwesomeIcon icon={faIcon} size={options?.size as SizeProp} />;
        }
        else {
            return undefined;
        }
    }
}