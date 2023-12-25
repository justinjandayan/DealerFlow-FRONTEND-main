import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";

const BrandsTable = () => {
	const [brands, setBrands] = useState([]);
	const [selectedBrand, setSelectedBrand] = useState(null);
	const [manufacturer, setManufacturer] = useState([]);

	const fetchBrands = async () => {
		try {
			const response = await axios.get("http://localhost:8000/api/car/brand");
			setBrands(response.data);
		} catch (error) {
			console.error("Error fetching brands:", error);
		}
	};

	const getManufacturer = async () => {
		try {
			const response = await axios.get(
				"http://localhost:8000/api/manufacturerVehicle"
			);
			console.log(response.data);
			setManufacturer(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchBrands();
		getManufacturer();
	}, []);

	const handleBrandClick = (brand) => {
		setSelectedBrand(brand);
	};

	const columns = [
		{
			name: "Manufacturer",
			selector: "manufacturer.manufacturerName", // Replace with your data key
			sortable: true,
		},
		{
			name: "Email",
			selector: "manufacturer.manufacturerEmail", // Replace with your data key
			sortable: true,
		},
		{
			name: "Address",
			selector: "manufacturer.manufacturerAddr", // Replace with your data key
			sortable: true,
		},
		{
			name: "Model",
			selector: "model.modelName", // Replace with your data key
			sortable: true,
		},
		{
			name: "VIN",
			selector: "vin", // Replace with your data key
			sortable: true,
		},
		{
			name: "Dealer",
			selector: "dealer.dealerName", // Replace with your data key
			sortable: true,
		},
		{
			name: "Date Created",
			selector: "createdAt", // Replace with your data key
			sortable: true,
		},
		// Add more columns as needed...
	];

	const customStyles = {
		headCells: {
			style: {
				backgroundColor: "#060b26", // Adjust this color to your desired dark background
				color: "#fff", // Text color for column headers
			},
		},
	};

	return (
		<div style={containerStyle}>
			<div className='manufacturer-title'>
				<h1>Manufacturer</h1>
			</div>
			<h2 className='manufacturer-click-for-more-info'>
				click image for more information
			</h2>
			<div style={flexContainer}>
				{brands.map((brand) => (
					<div
						key={brand._id}
						onClick={() => handleBrandClick(brand)}
						style={{
							...brandContainer,
							backgroundColor:
								selectedBrand && selectedBrand._id === brand._id
									? "#f0f0f0"
									: "transparent",
						}}>
						<div style={brandContent}>
							<div style={brandName}>{brand.brandName}</div>
							<img
								src={brand.image}
								alt={brand.brandName}
								style={brandImage}
							/>
						</div>
					</div>
				))}
			</div>

			{/* Display brand description */}
			{selectedBrand && (
				<div style={{ marginTop: "50px", marginLeft: "40px" }}>
					<h3>{selectedBrand.brandName}</h3>
					<p>{selectedBrand.manufacturer.description}</p>
					<Link
						to={`/vehicle-By-Brand/${selectedBrand._id}`}
						className='manufacturer-link'>
						<span className='manufacturer-span'>
							Go to {selectedBrand.brandName} models?
						</span>
					</Link>
				</div>
			)}
			<div className='table-container'>
				<h2>MANUFACTURER VEHICLES</h2>
				<DataTable
					columns={columns}
					data={manufacturer}
					pagination // Enable pagination if needed
					customStyles={customStyles} // Apply the custom styles to the table
					// Additional DataTable props can be added as needed
				/>
			</div>
		</div>
	);
};

const containerStyle = {
	width: "90%",
	margin: "auto",
};

const flexContainer = {
	display: "flex",
	flexWrap: "wrap",
	justifyContent: "flex-start",
};

const brandContainer = {
	flex: "0 0 calc(33.333% - 2000px)", // Adjust this value for desired column count and spacing
	//   marginRight: "10px",
	marginTop: "10px",
	marginLeft: "40px",
	padding: "10px",
	border: "1px solid #ddd",
	cursor: "pointer",
};

const brandContent = {
	textAlign: "center",
};

const brandName = {
	fontSize: "18px",
	marginBottom: "10px",
};

const brandImage = {
	maxWidth: "100px",
	maxHeight: "100px",
};

export default BrandsTable;
