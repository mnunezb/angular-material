import { animate, AnimationTriggerMetadata, state, style, transition, trigger  } from '@angular/animations';


export const FadeLateral = 
    trigger('fadeLateral',[
        transition(':enter', [
            style({
                opacity: 0,
                transform: 'translateX(-2%)'
            }),
            animate('300ms ease-in', style({
                opacity: 1,
                transform: 'translateX(0)'
            }))
        ])
    ])