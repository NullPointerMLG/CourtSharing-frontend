export interface Sport {
    // _id: string
    _id:  {$oid: string}
    name: string
    resource_id?: string
    icon_url?: string
    marker_url?: string
}