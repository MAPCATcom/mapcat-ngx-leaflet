// define a class that will hold the current settings and can generate a parameter URL

export class TileSettings {
    // global defines
    public LIST_STORIES = ['Car', 'Bicycle'];
    public DEFAULT_STORY = this.LIST_STORIES[0];

    static DEFAULT_API = 'http://rt-dev.mapcat.com/tile/{z}/{x}/{y}.png';
    static DEFAULT_PARAMETER = '?base&ocean&landcover&relief&styleId=default&scale=1';
    static DEFAULT_LANGCODE = 'en';

    // URL properties
    public urlAPI: string;
    public urlParameter: string;

    // properties
    public story: string;
    public langCode: string;

    public renderOnlyLabels: boolean;
    public renderAsRetina: boolean;
    public renderCycleRoutes: boolean;

    constructor() {
        // setup URL properties
        this.urlAPI = TileSettings.DEFAULT_API;
        this.urlParameter = TileSettings.DEFAULT_PARAMETER;

        // setup properties
        this.story = this.DEFAULT_STORY;
        this.langCode = TileSettings.DEFAULT_LANGCODE;

        this.renderOnlyLabels = false;
        this.renderAsRetina = false;
        this.renderCycleRoutes = true;

        // for consistency, regenerate the default
        this.generateParameter();
    }

    generateParameter(): void {
        var newParameter: string = '';
        // sources filled in
        newParameter += '?base';
        newParameter += '&ocean';
        newParameter += '&landcover';

        newParameter += '&relief';
        if (this.story == 'Bicycle') {
            // hd relief
            newParameter += '=hd,m';

            // cycle source
            newParameter += '&cycle'

            if (!this.renderCycleRoutes) {
                // remove cycle routes
                newParameter += '=-route';
            }
        }

        // setup label language
        newParameter += ('&labels=' + this.langCode);

        // setup style used
        if (this.story != 'Bicycle') {
            // default style
            newParameter += '&styleId=default'
        } else {
            // white style
            newParameter += '&styleId=white'
        }

        // setup render scale
        newParameter += '&scale=';
        if (!this.renderAsRetina) {
            newParameter += '1';
        } else {
            newParameter += '2';
        }

        // labels and symbols only
        if (this.renderOnlyLabels) {
            newParameter += '&noBase';
        }

        // copy over parameter
        this.urlParameter = newParameter;
    }
}