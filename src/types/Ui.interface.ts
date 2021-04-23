export interface DropdownMenuItemData {
    id: SearchBy | Language;
    index: number;
}

export enum SearchBy {
    Name = "name",
    Identifier = "identifier",
    Episode = "episode"
}

export enum Language {
    English = "en",
    French = "fr",
    German = "de"
}