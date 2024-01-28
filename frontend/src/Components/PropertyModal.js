export default function PropertyModal(){
    return(
        <div className="modal fade" id="propertyModal" tabIndex="-1"  aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="modal-heading">Add New Property</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form>
                    <div className="mb-3">
                        <label className="col-form-label">Title</label>
                        <input type="text" className="form-control" id="title"/>
                    </div>
                    <div className="mb-3">
                        <label className="col-form-label">Property Type</label>
                        <input type="text" className="form-control" id="property_type"/>
                    </div>
                    <div className="mb-3">
                        <label className="col-form-label">Image Url</label>
                        <input type="text" className="form-control" id="image"/>
                    </div>
                    <div className="mb-3">
                        <label className="col-form-label">Location</label>
                        <input type="text" className="form-control" id="location"/>
                    </div>
                    <div className="mb-3">
                        <label className="col-form-label">Price</label>
                        <input type="text" className="form-control" id="price"/>
                    </div>
                    <div className="mb-3">
                        <label className="col-form-label">Description:</label>
                        <textarea className="form-control" id="description"></textarea>
                    </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary custom-close-btn" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary custom-submit-btn">Send message</button>
                </div>
                </div>
            </div>
        </div>
    )
}