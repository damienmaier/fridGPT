/**
 * will be implemented to translate data structures between the API and the frontend if needed
 */
export interface Adapter<T> {
    adapt(item: any): T;
}